type LivEventHandler = (msgData: any) => void;

export class ImprovedLiveEvents {
  messageHandlers: Record<string, LivEventHandler[]>;

  constructor() {
      this.messageHandlers = {};
  }

  emitSingle(msgType: string, msgData: any) {
      const handlers = this.messageHandlers[msgType] || [];
      handlers.forEach(handler => {
          handler(msgData);
      });
  }

  emitWildcard(msgData: any) {
      const handlers = this.messageHandlers['*'] || [];
      handlers.forEach(handler => {
          handler(msgData);
      });
  }

  emit(msgType: string, msgData: any) {
      this.emitSingle(msgType, msgData);
      this.emitWildcard(msgData);
  }

  on(msgType: string, callback: LivEventHandler) {
      if (!this.messageHandlers[msgType]) {
          this.messageHandlers[msgType] = [callback];
      } else {
          this.messageHandlers[msgType].push(callback);
      }
  }

  ignoreAll(msgType: string) {
      delete this.messageHandlers[msgType];
  }

  // --- Extensions for cleanup ---

  off(msgType: string, callback: LivEventHandler) {
      if (!this.messageHandlers[msgType]) return;
      this.messageHandlers[msgType] = this.messageHandlers[msgType].filter(
          cb => cb !== callback
      );
  }

  removeAllListeners(msgType?: string) {
      if (msgType) {
          delete this.messageHandlers[msgType];
      } else {
          this.messageHandlers = {};
      }
  }
}
