export function flatObject(root, target) {
  Object.keys(root).forEach(key => {
    if (Array.isArray(root[key])) {
      target = { ...target, [key]: root[key][0] }
    }
    else if (typeof root[key] == 'object') {
      target = { ...target, ...flatObject(root[key], target) }
    }
    else {
      target = { ...target, [key]: root[key] }
    }
  })
  return target
}