import * as types from './mutation-types'
const matutaions = {
	// 歌手详情赋值
	[types.SET_SINGER](state, singer) {
    	state.singer = singer
	},
	// 播放器开关赋值
	[types.SET_PLAYING_STATE](state, flag) {
		state.playing = flag
	},
	// 播放器全屏播放赋值
	[types.SET_FULL_SCREEN](state, flag) {
		state.fullScreen = flag
	},
	// 播放器歌单列表赋值
	[types.SET_PLAYLIST](state, list) {
		state.playlist = list
	},
	// 播放器顺序播放列表赋值
	[types.SET_SEQUENCE_LIST](state, flag) {
		state.sequenceList = flag
	},
	// 播放器播放模式赋值
	[types.SET_PLAY_MODE](state, mode) {
		state.mode = mode
	},
	// 播放器当前播放的索引赋值
	[types.SET_CURRENT_INDEX](state, index) {
		state.currentIndex = index
	},
	// 设置歌单数据
	[types.SET_DISC](state, disc) {
		state.disc = disc
	},
	// 设置排行榜数据
	[types.SET_TOP_LIST](state, topList) {
		state.topList = topList
	},
	// 设置搜索历史数据
	[types.SET_SEARCH_HISTORY](state, history) {
		state.searchHistory = history
	},
	// 设置播放历史数据
	[types.SET_PLAY_HISTORY](state, history) {
		state.playHistory = history
	},
	// 设置我喜欢的数据
	[types.SET_FAVORITE_LIST](state, list) {
		state.favoriteList = list
	}
}

export default matutaions