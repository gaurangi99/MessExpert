import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem("token")) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    console.log(options)
    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/polls/getPolls?page=" + page + "&size=" + size,
        method: 'POST'
    });
}

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/polls/addPoll",
        method: 'POST',
        body: JSON.stringify(pollData)         
    });
}

export function castVote(voteData) {
    return request({
        url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
        method: 'POST',
        body: JSON.stringify(voteData)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/admin/user/checkUsernameAvailability?username=" + username,
        method: 'POST'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/admin/user/checkEmailAvailability?email=" + email,
        method: 'POST'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem("token")) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/user/me",
        method: 'POST'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/admin/users/" + username,
        method: 'POST'
    });
}

export function getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/admin/users/" + username + "/polls?page=" + page + "&size=" + size,
        method: 'POST'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/admin/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: 'POST'
    });
}