export class EventBus<DetailType = any> {
  private eventTarget: EventTarget;
  constructor(description = '') {
    this.eventTarget = document.appendChild(
      document.createComment(description)
    );
  }
  on(type: string, listener: (event: any) => void) {
    this.eventTarget.addEventListener(type, listener);
  }
  once(type: string, listener: (event: any) => void) {
    this.eventTarget.addEventListener(type, listener, { once: true });
  }
  off(type: string, listener: (event: any) => void) {
    this.eventTarget.removeEventListener(type, listener);
  }
  emit(type: string, detail?: DetailType) {
    return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  }
}
