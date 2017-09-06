import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'

function findIndex(list, song) {
	return list.findIndex((item) => {
		return item.id === song.id
	})
}

export const selectPlay = function({commit, state}, {list, index}) {
	// 打开播放器的一系列操作封装
	if (state.mode === playMode.random) {
		let randomlist = shuffle(list)
		commit(types.SET_PLAYLIST, randomlist)
		// 找到当前点击的这首歌在随机列表中的index
		index = findIndex(randomlist, list[index])
	} else {
		commit(types.SET_PLAYLIST, list)
	}
	// 设置顺序播放列表
	commit(types.SET_SEQUENCE_LIST, list)
	// 设置当前播放索引
	commit(types.SET_CURRENT_INDEX, index)
	// 设置当前为全屏播放
	commit(types.SET_FULL_SCREEN, true)
	// 设置当前播放器为打开
	commit(types.SET_PLAYING_STATE, true)
}

// 随机播放
export const randomPlay = function({commit}, {list}) {
	// 设置为随机播放
	commit(types.SET_PLAY_MODE, playMode.random)
	commit(types.SET_SEQUENCE_LIST, list)
	// 打乱数组
	let randomlist = shuffle(list)
	// 设置随机的歌曲列表
	commit(types.SET_PLAYLIST, randomlist)
	// 设置当前播放索引
	commit(types.SET_CURRENT_INDEX, 0)
	// 设置当前为全屏播放
	commit(types.SET_FULL_SCREEN, true)
	// 设置当前播放器为打开
	commit(types.SET_PLAYING_STATE, true)
}

// 播放当前搜索的歌曲
export const insertSong = function({commit, state}, song) {
	let playlist = state.playlist.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	// 记录当前歌曲
	let currentSong = playlist[currentIndex]

	// 查找当前歌曲是否有待插入的歌曲并返回其索引
	let fpIndex = findIndex(playlist, song)
	// 需要插入到当前歌曲index的后面，所以需要++
	currentIndex++
	// 插入歌曲到当前索引位置
	playlist.splice(currentIndex, 0, song)
	// 如果已经包含了这首歌
	if (fpIndex > -1) {
		// 如果当前插入的序号大于列表中的序号
		if (currentIndex > fpIndex) {
			// 删除前一个相同的歌曲
			playlist.splice(fpIndex, 1)
			// 因为currentIndex是+1了，对应后面插入的歌曲，删除了相同的歌曲之后，需要再减1
			currentIndex--
		} else {
			playlist.splice(fpIndex + 1, 1)
		}
	}

	let currentSIndex = findIndex(sequenceList, currentSong) + 1
	let fsIndex = findIndex(sequenceList, song)
	sequenceList.splice(currentSIndex, 0, song)
	if (fsIndex > -1) {
		if (currentSIndex > fsIndex) {
			sequenceList.splice(fsIndex, 1)
		} else {
			sequenceList.splice(fsIndex + 1, 1)
		}
	}
	commit(types.SET_PLAYLIST, playlist)
	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	// 设置当前为全屏播放
	commit(types.SET_FULL_SCREEN, true)
	// 设置当前播放器为打开
	commit(types.SET_PLAYING_STATE, true)
}

// 删除当前播放的歌曲
export const deleteSong = function({commit, state}, song) {
	let playlist = state.playlist.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	let pIndex = findIndex(playlist, song)
	playlist.splice(pIndex, 1)
	let sIndex = findIndex(sequenceList, song)
	sequenceList.splice(sIndex, 1)
	// 如果删除的歌曲序号在当前播放歌曲的后面，或者是删除了最后一首歌
	if (currentIndex > pIndex || currentIndex === playlist.length) {
		currentIndex--
	}

	commit(types.SET_PLAYLIST, playlist)
	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)

	// 如果播放列表中的歌曲被删完了
	const playingState = playlist.length > 0
	commit(types.SET_PLAYING_STATE, playingState)
}

// 清空播放列表
export const deleteSongList = function({commit}) {
	commit(types.SET_PLAYLIST, [])
	commit(types.SET_SEQUENCE_LIST, [])
	commit(types.SET_CURRENT_INDEX, -1)
	commit(types.SET_PLAYING_STATE, false)
}

export const saveSearchHistory = function({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
export const deleteSearchHistory = function({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
export const clearSearchHistory = function({commit}) {
	commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// 缓存当前播放历史
export const savePlayHistory = function({commit}, song) {
	commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const saveFavoriteList = function({commit}, song) {
	commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function({commit}, song) {
	commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}