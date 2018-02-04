import React from 'react'
import { db } from "../state"
import CustomHeader from "../CustomHeader"
import { Button, Text, View } from 'react-native'

export default class CatchUpdateWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = { __updated_props: {} }
    }

    componentDidMount() {
        db.setCurrentHeader(this)
    }

    componentWillUnmount() {
        db.setCurrentHeader(null)
    }

    render() {
        return <this.props.innerComponent {...this.props} {...this.state.__updated_props}/>
    }
}

class HeaderProxy extends React.Component {
    render() {
        return null
    }

    componentDidUpdate() {
        if (db.currentHeader !== null && db.transitionEnded) {
            db.currentHeader.setState({
                __updated_props: this.props,
            })
        }
    }
}

export class SlaveScreen extends React.Component {
    static navigationOptions = {
        header: (props: *) => {
            db.setHeaderProps(props)
            return <CatchUpdateWrapper innerComponent={CustomHeader}
                                       hideDuringTransition={true} {...props} />
        },
        headerBackTitle: null,
        headerTruncatedBackTitle: null,
        headerRight: <Button title={"Edit"} onPress={() => {
            db.slaveScreen.triggerEditMode()
        }}/>,
    }

    constructor(props) {
        super(props)
        this.state = { editMode: false }
        db.slaveScreen.setEditModeCallback(this.triggerEditMode.bind(this))
    }

    triggerEditMode() {
        this.setState({ editMode: true })
    }

    render() {
        return (
            <View style={{ backgroundColor: '#000', width: 1000, height: 1000 }}>
                <HeaderProxy
                    onChangeText={console.warn}
                    hideDuringTransition={true}
                    editStyle={this.state.editMode}
                    {...db.headerProps}
                />
                <Text style={{ color: "#FFF" }}>I'm the body!</Text>
            </View>
        )
    }
}
