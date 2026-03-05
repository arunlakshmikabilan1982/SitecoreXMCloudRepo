# Tailwind CSS Integration for Sitecore XM Cloud

## ✅ Installation Complete

Tailwind CSS has been successfully integrated into your Sitecore XM Cloud Next.js project with the following configuration:

## 📁 Files Added/Modified

### New Files:
- `tailwind.config.js` - Tailwind configuration with Sitecore-specific settings
- `postcss.config.js` - PostCSS configuration for Tailwind processing
- `src/assets/tailwind.css` - Tailwind directives and custom components
- `src/components/TailwindTest.tsx` - Test component to verify installation
- `.vscode/settings.json` - VS Code settings to handle Tailwind CSS properly
- `.vscode/css_custom_data.json` - Custom CSS data for Tailwind directives

### Modified Files:
- `src/pages/_app.tsx` - Added Tailwind CSS import
- `package.json` - Added Tailwind dependencies

## 🎨 Tailwind Configuration Features

### Custom Color Palette:
- **Primary Colors**: Blue gradient (50-900)
- **Secondary Colors**: Slate gradient (50-900)
- **Sitecore Brand Colors**: Orange, Blue, Dark, Gray

### Custom Components (in `tailwind.css`):
- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.card` - Card component styling
- `.input-field` - Form input styling
- `.container-fluid` - Responsive container
- `.sitecore-component` - Animation for Sitecore components

### Custom Utilities:
- `.text-balance` - Balanced text wrapping
- `.scrollbar-hide` - Hide scrollbars
- Custom animations: `fade-in`, `slide-up`

## 🚀 Usage Examples

### Basic Utility Classes:
```tsx
<div className="bg-primary-500 text-white p-4 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold mb-4">Hello Tailwind!</h1>
  <p className="text-gray-100">This is styled with Tailwind CSS</p>
</div>
```

### Custom Components:
```tsx
<button className="btn-primary">Primary Button</button>
<div className="card">Card Content</div>
<input className="input-field" placeholder="Enter text..." />
```

### Responsive Design:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="card">Item 1</div>
  <div className="card">Item 2</div>
  <div className="card">Item 3</div>
</div>
```

## 🧪 Testing the Installation

1. **Import the test component** in any page:
```tsx
import TailwindTest from 'components/TailwindTest';

// In your component
<TailwindTest />
```

2. **Run the development server**:
```bash
npm run start:connected
```

3. **Verify Tailwind is working** - you should see a colorful gradient card with responsive grid layout.

## 🔧 Development Workflow

### Adding Custom Styles:
1. **Utility-first approach**: Use Tailwind utilities directly in JSX
2. **Custom components**: Add to `@layer components` in `tailwind.css`
3. **Custom utilities**: Add to `@layer utilities` in `tailwind.css`

### Sitecore Component Integration:
```tsx
import { ComponentProps } from 'lib/component-props';

interface MyComponentProps extends ComponentProps {
  fields: {
    title: Field<string>;
    content: Field<string>;
  };
}

const MyComponent: React.FC<MyComponentProps> = ({ fields }) => (
  <div className="sitecore-component card">
    <h2 className="text-2xl font-bold text-primary-700 mb-4">
      <Text field={fields.title} />
    </h2>
    <div className="prose prose-lg">
      <RichText field={fields.content} />
    </div>
  </div>
);
```

## 🎯 Best Practices

### 1. **Maintain Sitecore Compatibility**:
- Keep existing Bootstrap/SCSS for Sitecore components that depend on it
- Use Tailwind for new custom components
- Test in Experience Editor to ensure editing capabilities work

### 2. **Performance Optimization**:
- Tailwind automatically purges unused CSS in production
- Use `@apply` sparingly - prefer utility classes
- Configure `content` paths in `tailwind.config.js` for proper purging

### 3. **Team Consistency**:
- Use the predefined color palette
- Follow the custom component patterns
- Document new utility classes

## 🔍 Troubleshooting

### CSS Not Loading:
- Ensure `tailwind.css` is imported in `_app.tsx`
- Check that PostCSS is processing the file correctly
- Verify `tailwind.config.js` content paths include your files

### VS Code Warnings:
- Install "Tailwind CSS IntelliSense" extension
- The `.vscode/settings.json` should suppress CSS validation warnings
- Restart VS Code if needed

### Build Issues:
- Run `npm run build` to test production build
- Check for any CSS conflicts with existing Sitecore styles
- Verify all Tailwind classes are being generated

## 📦 Dependencies Installed

```json
{
  "devDependencies": {
    "tailwindcss": "latest",
    "postcss": "latest",
    "autoprefixer": "latest",
    "@tailwindcss/forms": "latest",
    "@tailwindcss/typography": "latest"
  }
}
```

## 🎉 Next Steps

1. **Start using Tailwind** in your Sitecore components
2. **Customize the theme** in `tailwind.config.js` to match your brand
3. **Add more custom components** as needed
4. **Test in Experience Editor** to ensure compatibility
5. **Consider migrating** existing components gradually

Your Sitecore XM Cloud project now has modern, utility-first CSS capabilities with Tailwind CSS! 🚀
