export interface InputFieldProps {
    label?: string
    accept?: string
    id: string
    value?: string
    name: string
    placeholder?: string
    required?: boolean
    autoFocus?: boolean
    fullWidth?: boolean
    disabled?: boolean
    type: 'text' | 'email' | 'password' | 'hidden' | 'textArea' | 'number' | 'file'| 'date'
    onInput?: (e: any) => void
    onChange?: (e: any) => void
    InputProps?: any
    isProtected?: boolean
}