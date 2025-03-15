import { persisted } from 'svelte-persisted-store'

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const content = persisted('content', '')

// which character is the start of the last render
export const contentPosition = persisted('content-position', 0)

let prev
content.subscribe((val) => {
  // This handling allows us to only reset content position 
  // *after* the initial load from localstorage, and only if
  // the new val isn't the old val
  if (prev && prev != val) {
    console.log('did an update')
     
    contentPosition.set(0) 
  } else {
    console.log('didnt update')
  }
  prev = val
})


export const settings = persisted('settings', {
  maxLineLength: 50
})