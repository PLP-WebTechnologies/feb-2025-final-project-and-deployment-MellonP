# Car Website - Files Overview

## CSS Files
- `compiled.css` - The single CSS file containing all styles for the website

## JavaScript Files
- `script.js` - The single JavaScript file with all website functionality

## HTML Template
- `templates/compiled_index.html` - The complete homepage template with all sections

## How to Customize
### 1. Change Car Data
Edit the `app.py` file to modify car listings:
```python
cars_data = [
    {
        "id": 1,
        "brand": "Toyota",  # Change brand name
        "model": "Camry",   # Change model name
        "year": 2023,       # Change year
        "price": 28500,     # Change price
        "type": "Sedan",    # Change type
        "featured": True,   # Set to True to show on homepage
        "description": "Your car description here",
        "specs": {
            # Car specifications
        },
        "colors": ["Color 1", "Color 2", "Color 3"],
        "images": [
            "URL to primary image",
            "URL to second image",
            "URL to third image"
        ]
    },
    # Add more car entries as needed
]
```

### 2. Change Site Branding
In `compiled_index.html`, modify:
- Line ~20: Change site name and logo
- Line ~302: Footer branding and social links
- Line ~350: Update copyright

### 3. Customize Hero Section
In `compiled_index.html`, modify:
- Line ~101: Change main headline
- Line ~102: Change subheading
- Line ~103: Modify button text or link

### 4. Update Images
1. Use direct URLs in the car data "images" array
2. Or place images in a `/static/images/` folder and reference them with:
   ```
   /static/images/your-image-file.jpg
   ```

### 5. Color Scheme
In `compiled.css`, modify the root variables around line 4-10:
```css
:root {
  --primary-color: #2c3e50;   /* Main color */
  --secondary-color: #e74c3c;  /* Accent color */
  --light-color: #ecf0f1;     /* Light backgrounds */
  --dark-color: #2c3e50;      /* Dark backgrounds */
}
```

### 6. Contact Information
In `compiled_index.html`, update the footer contact info around line ~330-340:
- Address
- Phone numbers
- Email
- Business hours
