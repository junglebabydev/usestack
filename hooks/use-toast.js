"use client"

// Inspired by react-hot-toast library
import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

/**
 * @typedef {Object} ToasterToast
 * @property {string} id - Unique identifier for the toast
 * @property {React.ReactNode} [title] - Toast title content
 * @property {React.ReactNode} [description] - Toast description content
 * @property {import("@/components/ui/toast").ToastActionElement} [action] - Toast action element
 * @property {boolean} [open] - Whether the toast is open
 * @property {function} [onOpenChange] - Callback when toast open state changes
 * @property {string} [variant] - Toast variant (default, destructive)
 * @property {string} [className] - Additional CSS classes
 */

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

/**
 * @typedef {Object} State
 * @property {ToasterToast[]} toasts - Array of active toasts
 */

/** @type {Map<string, NodeJS.Timeout>} */
const toastTimeouts = new Map()

/**
 * Adds a toast to the remove queue with a delay
 * @param {string} toastId - The ID of the toast to remove
 */
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * Reducer function for managing toast state
 * @param {State} state - Current state
 * @param {Object} action - Action to perform
 * @returns {State} New state
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

/** @type {Array<function(State): void>} */
const listeners = []

/** @type {State} */
let memoryState = { toasts: [] }

/**
 * Dispatches an action to update the toast state
 * @param {Object} action - The action to dispatch
 */
function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

/**
 * Creates and displays a toast
 * @param {Omit<ToasterToast, 'id'>} props - Toast properties
 * @returns {Object} Toast control object with id, dismiss, and update methods
 */
function toast({ ...props }) {
  const id = genId()

  const update = (props) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

/**
 * Hook for managing toast notifications
 * @returns {Object} Toast state and control functions
 */
function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
