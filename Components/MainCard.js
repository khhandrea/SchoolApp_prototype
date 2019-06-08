import React, { Component } from 'react'
import { Alert, Text, StyleSheet, View, Dimensions, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native'
import Readmore from 'react-native-read-more-text';
import { Colors } from '../Asset';
import { LinearGradient } from 'expo';
import BookmarkFill from '../Icons/bookmarkFill.svg';
import BookmarkEmpty from '../Icons/bookmarkEmpty.svg';
import HeartFill from '../Icons/heartFill.svg';
import HeartEmpty from '../Icons/heartEmpty.svg';
import Dots from '../Icons/threeDots.svg';
//자세히 보기 직접 만들어 

const WIDTH = Dimensions.get('window').width;
let _likeNum;

export default class MainCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myPage: 1,
        }
    }
    componentDidMount() {
    }
    _imageClicked(source) {
        this.props.navigation.navigate('Photo', { image: source });
    }
    _scrollHandle = (event) => {
        const page = Math.round(event.nativeEvent.contentOffset.x / (WIDTH - 40)) + 1;
        this.setState({
            myPage: page
        })
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: Colors.lightGray, fontSize: 14, lineHeight: 20 }} onPress={handlePress}>
                자세히 보기
          </Text>
        );
    }
    _renderRevealedFooter = (handlePress) => {
        return (
            null
        );
    }
    render() {
        const { name, date, commentNum, like, content, isLiked, isBookmarked, image, tag, ratio } = this.props;

        const tagList = tag ? tag.map(
            (text, index) => (
                <View key={index} style={styles.TagList}>
                    <View style={{
                        width: 4, height: 4, borderRadius: 2, marginRight: 4,
                        backgroundColor: (index % 2 == 0 ? Colors.blue : Colors.red)
                    }} />
                    <Text style={{ fontSize: 14 }}>{text}</Text>
                </View>
            )
        ) : null;

        const imageList = image ? image.map(
            (source, index) => (
                <TouchableOpacity activeOpacity={1} key={index} onPress={() => this._imageClicked(source)}><Image source={{ uri: source }} style={{ width: WIDTH - 40, height: (WIDTH - 40) * ratio }} /></TouchableOpacity>
            )
        ) : null;

        return (
            <View style={styles.Conatiner}>
                <View style={styles.HeaderContainer}>
                    <View style={styles.UserContainer}>
                        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'red' }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                            <Text style={{ fontSize: 14 }}>{name}</Text>
                            <Text style={{ fontSize: 10, color: Colors.gray, marginLeft: 4, marginTop: 4 }}>{date}</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}><Dots /></TouchableWithoutFeedback>
                </View>

                {imageList != null ?
                    <View style={styles.ImageContainer}>
                        <ScrollView overScrollMode={"never"} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} onScroll={this._scrollHandle} scrollEventThrottle={16}>
                            {imageList}

                        </ScrollView>
                        {image.length > 1 ?
                            <View style={styles.ImageNav}><Text style={{ color: 'white', fontSize: 12 }}>{this.state.myPage}/{image.length}</Text></View> : null}
                    </View> : null}

                {tagList != null ? <View style={styles.TagContainer}>
                    {tagList}
                </View> : null}

                <View style={styles.ContentContainer}>
                    <View style={styles.ContentTextContainer}>
                        <Readmore numberOfLines={2} renderTruncatedFooter={this._renderTruncatedFooter} renderRevealedFooter={this._renderRevealedFooter}>
                            <Text style={styles.ContentText}>{content}</Text>
                        </Readmore>
                        <Text style={styles.ContentData}>
                            좋아요{like} · 댓글{commentNum}
                        </Text>
                    </View>
                </View>

                <LinearGradient colors={[Colors.lightBlue, Colors.lightRed]} style={styles.BottomBar} start={[0, 0]} end={[1, 1]} >
                    <TouchableOpacity style={styles.BottomBarContent}>
                        {isLiked == true ? <HeartFill /> : <HeartEmpty />}
                        <Text style={{ color: 'white', marginLeft: 8 }}>좋아요</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: '100%', justifyContent: 'center' }}><Text style={{ color: 'white' }} >댓글</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.BottomBarContent}>
                        {isBookmarked == true ? <BookmarkFill /> : <BookmarkEmpty />}
                        <Text style={{ color: 'white', marginLeft: 8 }}>북마크</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    Conatiner: {
        marginBottom: 36,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 20,
        width: WIDTH - 40,
    },
    HeaderContainer: {
        flexDirection: 'row',
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 14,
        paddingRight: 14,
    },
    UserContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ImageContainer: {
        width: WIDTH - 40,
        marginBottom: 5,
    },
    ImageNav: {
        height: 20,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#4b4b4b80',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 10,
    },
    TagContainer: {
        width: WIDTH - 40,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    TagList: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    ContentContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    ContentTextContainer: {
        width: '100%',
        marginBottom: 5,
    },
    ContentText: {
        fontSize: 14,
        lineHeight: 20
    },
    ContentData: {
        textAlign: 'right',
        fontSize: 10,
        color: Colors.lightGray,
        fontWeight: 'bold',
    },
    BottomBar: {
        height: 40,
        width: '100%',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
    },
    BottomBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    }
})
