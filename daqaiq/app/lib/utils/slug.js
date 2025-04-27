export function generateSlug(name) {
  // Convert to lowercase and replace spaces with hyphens
  let slug = name.toLowerCase().replace(/\s+/g, '-');
  
  // Remove special characters and keep only alphanumeric and hyphens
  slug = slug.replace(/[^a-z0-9-]/g, '');
  
  // Remove multiple consecutive hyphens
  slug = slug.replace(/-+/g, '-');
  
  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');
  
  // Add timestamp to ensure uniqueness
  const timestamp = Date.now();
  
  return `${slug}-${timestamp}`;
} 