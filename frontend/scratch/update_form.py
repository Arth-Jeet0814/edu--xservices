with open('src/components/home/InstitutionalPartnershipSection.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace input class patterns
code = code.replace(
    'bg-navy-900 border rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500',
    'bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40'
)
code = code.replace(
    'bg-navy-900 border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500',
    'bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40'
)
code = code.replace('border-navy-700', 'border-input')
code = code.replace('text-slate-300 mb-2', 'text-foreground mb-1.5')
code = code.replace("text-gold-400", "text-crimson")
code = code.replace('variant="gold"', 'variant="accent"')
code = code.replace('border-navy-800', 'border-border')
code = code.replace('text-slate-400', 'text-muted-foreground')

with open('src/components/home/InstitutionalPartnershipSection.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print('Updated InstitutionalPartnershipSection.jsx successfully!')
