import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from transformers import AutoTokenizer, AutoModel
import numpy as np
from typing import List, Dict, Any
from bs4 import BeautifulSoup
import re
import random

class CookieBannerAnalyzer(nn.Module):
    def __init__(self, html_encoder_dim=768, hidden_dim=256):
        super().__init__()
        
        # HTML encoder using CodeBERT
        self.html_encoder = AutoModel.from_pretrained('microsoft/codebert-base')
        
        # Cookie-specific feature extraction
        self.cookie_feature_extractor = nn.Sequential(
            nn.Linear(html_encoder_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU()
        )
        
        # Element hierarchy understanding
        self.hierarchy_encoder = nn.Sequential(
            nn.Linear(hidden_dim * 2, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.1)
        )
        
        # Button detection
        self.button_classifier = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(hidden_dim // 2, 1),
            nn.Sigmoid()
        )
        
        # Container scoring
        self.container_scorer = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(hidden_dim // 2, 1)
        )
        
        # Language understanding for button text
        self.language_encoder = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(hidden_dim, hidden_dim)
        )
        
        self.tokenizer = AutoTokenizer.from_pretrained('microsoft/codebert-base')
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.to(self.device)
    
    def analyze_element_context(self, element, soup):
        """Analyze the context of an element including its parent-child relationships."""
        # Get parent elements
        parents = []
        parent = element.parent
        while parent and parent.name:
            parents.append(parent)
            parent = parent.parent
        
        # Get sibling elements
        siblings = element.find_all_next(recursive=False) + element.find_all_previous(recursive=False)
        
        # Get child elements
        children = element.find_all(recursive=False)
        
        return {
            'parents': parents,
            'siblings': siblings,
            'children': children,
            'depth': len(parents),
            'has_cookie_related_siblings': any('cookie' in str(sib).lower() for sib in siblings),
            'has_button_children': any(child.name == 'button' for child in children)
        }
    
    def analyze_button_text(self, button):
        """Analyze button text for cookie-related actions."""
        text = button.get_text().lower()
        
        # Common cookie acceptance patterns in multiple languages
        accept_patterns = {
            'en': ['accept', 'agree', 'allow', 'consent', 'ok', 'got it'],
            'de': ['akzeptieren', 'zustimmen', 'einverstanden', 'alle annehmen', 'alle akzeptieren'],
            'fr': ['accepter', 'accepter tout', 'j\'accepte', 'd\'accord'],
            'es': ['aceptar', 'aceptar todo', 'de acuerdo'],
            'it': ['accetta', 'accetta tutto', 'acconsento']
        }
        
        # Check for matches in each language
        matches = {
            lang: [pat for pat in patterns if pat in text]
            for lang, patterns in accept_patterns.items()
        }
        
        return {
            'has_accept_text': any(m for m in matches.values()),
            'language_matches': matches,
            'is_primary_button': 'all' in text or 'alle' in text or 'tout' in text or 'todo' in text,
            'confidence': sum(len(m) for m in matches.values()) / len(accept_patterns)
        }
    
    def get_selector(self, element):
        """Generate a robust selector for the element."""
        selectors = []
        
        # Try data attributes first
        data_attrs = [attr for attr in element.attrs if attr.startswith('data-')]
        if data_attrs:
            selectors.extend(f'[{attr}="{element[attr]}"]' for attr in data_attrs)
        
        # Try ID
        if element.get('id'):
            selectors.append(f'#{element["id"]}')
        
        # Try classes
        if element.get('class'):
            selectors.append('.' + '.'.join(element['class']))
        
        # Try role
        if element.get('role'):
            selectors.append(f'[role="{element["role"]}"]')
        
        # Try aria attributes
        aria_attrs = [attr for attr in element.attrs if attr.startswith('aria-')]
        if aria_attrs:
            selectors.extend(f'[{attr}="{element[attr]}"]' for attr in aria_attrs)
        
        # Try tag with nth-child for uniqueness
        if element.parent:
            siblings = element.parent.find_all(element.name, recursive=False)
            if siblings:
                index = siblings.index(element) + 1
                selectors.append(f'{element.name}:nth-child({index})')
        
        return ' '.join(selectors)
    
    def encode_element(self, element):
        """Encode an element's text and attributes for the model."""
        # Get element text and attributes
        text = element.get_text()
        attrs = ' '.join(f'{k}="{v}"' for k, v in element.attrs.items())
        
        # Tokenize
        tokens = self.tokenizer(
            text + ' ' + attrs,
            padding='max_length',
            truncation=True,
            max_length=512,
            return_tensors='pt'
        )
        
        # Move to device
        tokens = {k: v.to(self.device) for k, v in tokens.items()}
        
        # Get embeddings
        with torch.no_grad():
            embeddings = self.html_encoder(**tokens)[0].mean(dim=1)
        
        return embeddings
    
    def forward(self, html_content):
        """Analyze HTML content for cookie banners."""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Find potential cookie banner elements
        candidates = []
        for element in soup.find_all():
            # Skip script and style tags
            if element.name in ['script', 'style']:
                continue
            
            # Get element features
            context = self.analyze_element_context(element, soup)
            text_content = element.get_text().lower()
            
            # Check if element might be cookie-related
            if ('cookie' in text_content or 
                'consent' in text_content or 
                any('cookie' in str(attr).lower() for attr in element.attrs.values())):
                
                # Encode element
                features = self.encode_element(element)
                features = self.cookie_feature_extractor(features)
                
                # Score container
                container_score = self.container_scorer(features)
                
                # Find and analyze buttons
                buttons = element.find_all('button') + element.find_all('a', class_=lambda x: x and 'button' in x)
                button_analyses = [self.analyze_button_text(btn) for btn in buttons]
                
                candidates.append({
                    'element': element,
                    'context': context,
                    'container_score': container_score,
                    'buttons': list(zip(buttons, button_analyses)),
                    'selector': self.get_selector(element)
                })
        
        return candidates

class CookieBannerDataset(Dataset):
    def __init__(self, html_samples, annotations):
        self.tokenizer = AutoTokenizer.from_pretrained('microsoft/codebert-base')
        self.html_samples = html_samples
        self.annotations = annotations
    
    def __len__(self):
        return len(self.html_samples)
    
    def __getitem__(self, idx):
        html = self.html_samples[idx]
        annotation = self.annotations[idx]
        
        # Parse HTML
        soup = BeautifulSoup(html, 'html.parser')
        
        # Get positive and negative examples
        positive_elements = []
        negative_elements = []
        
        # Find annotated cookie banner
        if annotation['container_selector']:
            container = soup.select_one(annotation['container_selector'])
            if container:
                positive_elements.append(container)
                # Get accept buttons
                for btn_selector in annotation['button_selectors']:
                    btn = container.select_one(btn_selector)
                    if btn:
                        positive_elements.append(btn)
        
        # Get some negative examples
        for element in soup.find_all(['div', 'section', 'aside', 'button', 'a']):
            if element not in positive_elements:
                negative_elements.append(element)
        
        # Sample negative elements to balance dataset
        negative_elements = random.sample(negative_elements, min(len(negative_elements), len(positive_elements) * 3))
        
        # Prepare features and labels
        features = []
        labels = []
        
        for element in positive_elements + negative_elements:
            # Get element text and attributes
            text = element.get_text()
            attrs = ' '.join(f'{k}="{v}"' for k, v in element.attrs.items())
            
            # Tokenize
            tokens = self.tokenizer(
                text + ' ' + attrs,
                padding='max_length',
                truncation=True,
                max_length=512,
                return_tensors='pt'
            )
            
            features.append({
                'input_ids': tokens['input_ids'],
                'attention_mask': tokens['attention_mask'],
                'element_type': element.name,
                'is_button': element.name in ['button', 'a'],
                'has_cookie_text': 'cookie' in (text + attrs).lower()
            })
            
            labels.append(1 if element in positive_elements else 0)
        
        return features, torch.tensor(labels)

def train_cookie_model(model, train_dataset, val_dataset, epochs=10, batch_size=32):
    """Train the cookie banner detection model."""
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size)
    
    optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
    criterion = nn.BCEWithLogitsLoss()
    
    best_val_loss = float('inf')
    
    for epoch in range(epochs):
        # Training
        model.train()
        train_loss = 0
        for batch_features, batch_labels in train_loader:
            optimizer.zero_grad()
            
            # Forward pass
            outputs = model(batch_features)
            loss = criterion(outputs, batch_labels.float())
            
            # Backward pass
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
        
        # Validation
        model.eval()
        val_loss = 0
        with torch.no_grad():
            for batch_features, batch_labels in val_loader:
                outputs = model(batch_features)
                val_loss += criterion(outputs, batch_labels.float()).item()
        
        # Save best model
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(model.state_dict(), 'best_cookie_model.pth')
        
        print(f'Epoch {epoch + 1}/{epochs}')
        print(f'Training Loss: {train_loss / len(train_loader):.4f}')
        print(f'Validation Loss: {val_loss / len(val_loader):.4f}')
