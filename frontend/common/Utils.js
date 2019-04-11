import * as draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js'

const flatObject = (root, target) => {
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

const htmlToState = (html) => {
  const contentBlock = htmlToDraft(html);
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return editorState
  }
}

const draftToRaw = (draft) => {
  return draftToHtml(convertToRaw(draft.getCurrentContent()))
}

export  { htmlToState, draftToRaw, flatObject }