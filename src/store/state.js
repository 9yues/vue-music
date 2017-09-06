import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'
const state = {
	// 歌手详情页数据
	singer: {},
	// 播放器开关
	playing: false,
	// 播放器是否全屏播放
	fullScreen: false,
	// 播放器歌单列表
	playlist: [],
	// 播放器顺序播放列表
	sequenceList: [],
	// 播放器播放模式，默认顺序播放
	mode: playMode.sequence,
	// 当前播放的索引
	currentIndex: -1,
	// 歌单对象
	disc: {},
	// 排行榜对象
	topList: {},
	// 搜索历史
	searchHistory: loadSearch(),
	// 播放历史
	playHistory: loadPlay(),
	// 我喜欢的
	favoriteList: loadFavorite()
}
export default state