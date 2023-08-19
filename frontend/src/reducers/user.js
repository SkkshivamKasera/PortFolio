import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    loading: true
}

export const userReducer = createReducer(initialState, {
    "GET_USER_REQUEST": (state) => {
        state.loading = true
    },
    "GET_USER_SUCCESS": (state, action) => {
        state.loading = false
        state.user = action.payload
    },
    "GET_USER_FAILIURE": (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    "CLEAR_ERROR": (state) => {
        state.error = null
    }
})

export const loginReducer = createReducer({}, {
    "LOGIN_REQUEST": (state) => {
        state.loading = true
        state.isAuthenticated = false
    },
    "LOGIN_SUCCESS": (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.message = action.payload
    },
    "LOGIN_FAILIURE": (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
    },
    "LOAD_USER_REQUEST": (state) => {
        state.loading = true
        state.isAuthenticated = false
    },
    "LOAD_USER_SUCCESS": (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
    },
    "LOAD_USER_FAILIURE": (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
    },
    "LOGOUT_REQUEST": (state) => {
        state.loading = true
    },
    "LOGOUT_SUCCESS": (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.message = action.payload
        state.user = null
    },
    "LOGOUT_FAILIURE": (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.error = action.payload
    },
    "CLEAR_ERROR": (state) => {
        state.error = null
    },
    "CLEAR_MESSAGE": (state) => {
        state.message = null
    }
})

export const updateReducer = createReducer({}, {
    "USER_UPDATE_REQUEST": (state) => {
        state.loading = true
    },
    "USER_UPDATE_SUCCESS": (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    "USER_UPDATE_FAILIURE": (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    "ADD_TIMELINE_REQUEST": (state) => {
        state.loading = true
    },
    "ADD_TIMELINE_SUCCESS": (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    "ADD_TIMELINE_FAILIURE": (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    "ADD_YOUTUBE_REQUEST": (state) => {
        state.loading = true
    },
    "ADD_YOUTUBE_SUCCESS": (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    "ADD_YOUTUBE_FAILIURE": (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    "ADD_PROJECT_REQUEST": (state) => {
        state.loading = true
    },
    "ADD_PROJECT_SUCCESS": (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    "ADD_PROJECT_FAILIURE": (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    "DELETE_TIMELINE_REQUEST": (state) => {
        state.loading = true
    },
    "DELETE_TIMELINE_SUCCESS": (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    "DELETE_TIMELINE_FAILIURE": (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    "DELETE_YOUTUBE_REQUEST": (state) => {
        state.loading = true
    },
    "DELETE_YOUTUBE_SUCCESS": (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    "DELETE_YOUTUBE_FAILIURE": (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    "DELETE_PROJECT_REQUEST": (state) => {
        state.loading = true
    },
    "DELETE_PROJECT_SUCCESS": (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    "DELETE_PROJECT_FAILIURE": (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    "CONTACT_REQUEST": (state) => {
        state.loading = true
    },
    "CONTACT_SUCCESS": (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    "CONTACT_FAILIURE": (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    "CLEAR_ERROR": (state) => {
        state.error = null
    },
    "CLEAR_MESSAGE": (state) => {
        state.message = null
    }
})