export const baseUrl = "https://auth.nomoreparties.co";

export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'password': password,
            'email': email
        })
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));

}

export const authorize = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'password': password,
            'email': email
        })
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));

}

export const getToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}