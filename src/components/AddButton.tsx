import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

type Props = {
   handleClick: () => void
}

const AddButton = (props: Props) => {
   return (
      <Button onClick={props.handleClick} sx={{ fontWeight: 'bold' }} variant='contained' size='large' endIcon={<AddIcon />}>
         Add
      </Button>
   )
}

export default AddButton
