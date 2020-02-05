import * as firebase from 'firebase/app';
import 'firebase/database';
import Store from '@/store';

export function videoController(status) {
    if (Store.state.login.userState !== '딜리언즈') return alert('딜리언즈만 사용 가능합니다.');
    firebase.database().ref(`control/lounge`).set({
        status,
        date: String(new Date()),
    });

    firebase.database().ref('control/log').push({
        status,
        name: Store.state.login.userName,
    });
}

export function updateMelon(data) {
    firebase.database().ref('melon').set({
        result : data.result,
        registDate : data.registDate,
    });
}

export function addVideoStatus(data) {
    firebase.database().ref('status/lounge').set({
        status: data.status,
        playTime: data.playTime,
        videoName: data.videoName,
    });
}

export function addGroupMusic(data) {
    if (Store.state.login.userState !== '딜리언즈') return alert('딜리언즈만 사용 가능합니다.');

    firebase.database().ref(`music/group/${data.userId}/${data.groupName}`).push({
        musicName: data.musicName,
        videoId: data.videoId,
        registDate: data.registDate,
        userName: data.userName,
    });
    return alert('저장했습니다.');
}

export function addMyGroup(data) {
    if (Store.state.login.userState !== '딜리언즈') return alert('딜리언즈만 사용 가능합니다.');

    firebase.database().ref(`music/group/${data.userId}`).push().set({
        [data.groupName]: '',
    });
}
export function editMyGroup(data) {
    if (Store.state.login.userState !== '딜리언즈') return alert('딜리언즈만 사용 가능합니다.');
    const key = data.userId + '/name';
    firebase.database().ref(`music/group`).update({
        [key] : data.groupName,
    });
}