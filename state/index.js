/*
 * @providesModule State
 */

export class State {
    transitionEnded = false
    headerProps = null
    setTransitionEnded(transitionEnded) {
        this.transitionEnded = transitionEnded
    }
    setCurrentHeader(header) {
        this.currentHeader = header
    }
    setHeaderProps(headerProps) {
        this.headerProps = headerProps
    }
    slaveScreen = {
        triggerEditMode: () => null,
        setEditModeCallback: function(callback) {
            this.triggerEditMode = callback
        },
    }
}

export let db: State = new State()
