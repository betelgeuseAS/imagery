import { Alert, AlertColor, AlertProps, AlertTitle } from '@mui/material'

type IMessageProps = {
  children: React.ReactNode
  type: AlertColor
  title: React.ReactNode
} & AlertProps

const Message: React.FC<IMessageProps> = ({ children, title, type, ...otherAlertProps }) => {
  return (
    <Alert {...otherAlertProps} severity={type}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  )
}

export default Message
