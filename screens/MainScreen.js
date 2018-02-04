import React from 'react'
import { Button } from 'react-native'

export class MainScreen extends React.Component {
    // in an actual implementation, there would be some kind of debounce
    render() {
        return (
            <Button title={"Go"} onPress={() => {
                db.setTransitionEnded(true)
                this.props.navigation.navigate("SlaveScreen")
            }}/>
        )
    }
}
