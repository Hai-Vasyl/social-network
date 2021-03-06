export const DROPDOWN_TOGGLE = "DROPDOWN_TOGGLE"
export const AUTHFORM_TOGGLE = "AUTHFORM_TOGGLE"
export const CHAT_TOGGLE = "CHAT_TOGGLE"
export const CHAT_OPEN = "CHAT_OPEN"
export const AUTHFORM_OPEN = "AUTHFORM_OPEN"
export const NOTIFICATIONS_TOGGLE = "NOTIFICATIONS_TOGGLE"
export const CONTENT_TOGGLE = "CONTENT_TOGGLE"
export const CONTENT_OPEN = "CONTENT_OPEN"
export const RESET_TOGGLE = "RESET_TOGGLE"

export interface ToggleDropDown {
  type: typeof DROPDOWN_TOGGLE
}
export interface ToggleAuthForm {
  type: typeof AUTHFORM_TOGGLE
}
export interface notificationsToggle {
  type: typeof NOTIFICATIONS_TOGGLE
}
export interface chatToggle {
  type: typeof CHAT_TOGGLE
}
export interface contentToggle {
  type: typeof CONTENT_TOGGLE
}
export interface contentOpen {
  type: typeof CONTENT_OPEN
}
export interface chatOpen {
  type: typeof CHAT_OPEN
}
export interface authFormOpen {
  type: typeof AUTHFORM_OPEN
}
export interface ResetToggle {
  type: typeof RESET_TOGGLE
}

export type ToggleReducerTypes =
  | ToggleDropDown
  | ResetToggle
  | ToggleAuthForm
  | notificationsToggle
  | chatToggle
  | chatOpen
  | authFormOpen
  | contentToggle
  | contentOpen
