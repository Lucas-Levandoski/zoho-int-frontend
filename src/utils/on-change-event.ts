const event = new Event('OnChange')

export function onChangeEvent() {
  document.dispatchEvent(event);
}