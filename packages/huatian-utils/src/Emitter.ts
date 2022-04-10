
type EventHandler = (...arg:any[]) => void

class Emitter<EventType extends string | number> {
    private handlers =  new Map<EventType, EventHandler[]>()
    private getHandler = (type:EventType) => {
        if(!this.handlers.has(type)) {
            this.handlers.set(type, [])
        }
        return this.handlers.get(type)
    }
    private unsubscribe(event:EventType, handler:EventHandler) {
        if(this.handlers.get(event)) {
            const filterHandlers = this.handlers.get(event)!.filter(_ => _ !== handler)
            this.handlers.set(event, filterHandlers)
        }
        
    }
    on(type: EventType, handler: EventHandler) {
        const targetHandlers = this.getHandler(type)
        targetHandlers?.push(handler)
    }
    emit(event: EventType, handler: EventHandler ) {
        const handlers = this.getHandler(event)
        handlers?.forEach(_ => {
            _&&_()
        })
        return () => {
            this.unsubscribe(event,handler)
        }
   }
}