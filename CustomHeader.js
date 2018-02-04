import React from 'react'
import { UnwrappedHeader } from "react-navigation/src/views/Header/Header"

import {
    Animated, Button, Dimensions, Platform, StyleSheet, Text, TextInput, View,
    ViewPropTypes,
} from 'react-native'

import type {
    HeaderProps, LayoutEvent, NavigationScene,
    NavigationStyleInterpolator,
} from '../../TypeDefinition'
import withOrientation from "react-navigation/src/views/withOrientation"

type SceneProps = {
    scene: NavigationScene,
    position: Animated.Value,
    progress: Animated.Value,
    style?: ViewPropTypes.style,
};

let platformContainerStyles
if (Platform.OS === 'ios') {
    platformContainerStyles = {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0, 0, 0, .3)',
    }
} else {
    platformContainerStyles = {
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
        },
        elevation: 4,
    }
}
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56

class CustomHeader extends UnwrappedHeader {
    _renderTitleComponent = (props: SceneProps) => {
        const details = this.props.getScreenDetails(props.scene)
        const headerTitle = details.options.headerTitle
        if (React.isValidElement(headerTitle)) {
            return headerTitle
        }
        const titleString = this._getHeaderTitleString(props.scene)

        const titleStyle = details.options.headerTitleStyle
        const color = details.options.headerTintColor
        const allowFontScaling = details.options.headerTitleAllowFontScaling


        // On iOS, width of left/right components depends on the calculated
        // size of the title.
        const onLayoutIOS =
            Platform.OS === 'ios'
                ? (e: LayoutEvent) => {
                    this.setState({
                        widths: {
                            ...this.state.widths,
                            [props.scene.key]: e.nativeEvent.layout.width,
                        },
                    })
                }
                : undefined

        return (
            <View pointerEvents={'auto'} style={{ height: 30, width: this.state.width }}>
                <TextInput
                    placeholder={this.props.editStyle ? "We're in edit mode" : "Tap to add a title"}
                    style={{
                        flex: 1,
                        fontSize: Platform.OS === 'ios' ? 17 : 20,
                        fontWeight: Platform.OS === 'ios' ? '600' : '500',
                        color: '#000',
                        textAlign: Platform.OS === 'ios' ? 'center' : 'left',
                        marginHorizontal: 16,
                    }}
                    onContentSizeChange={(nativeEvent: {}) => {
                        this.setState({ width: nativeEvent.contentSize.width })
                    }}
                    onChangeText={(text) => {
                        this.setState({ text })
                        this.props.onChangeText()
                    }}
                    value={this.state.text}
                />
            </View>
        )
    }

    constructor(props) {
        super(props)
        this.state.text = props.text
        this.state.width = 500
        this.state.transitionEnded = 3
    }
}

export default withOrientation(CustomHeader)
