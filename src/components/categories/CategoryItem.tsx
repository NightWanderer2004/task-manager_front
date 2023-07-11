import { Box, ListItem } from '@mui/material'
import { MouseEvent, useState } from 'react'
import CategoryActions from './CategoryActions'

type Props = {
   name: string
   sumOfTasks: number
   dateCreated: number
   categoryId: number
}

const CategoryItem = (props: Props) => {
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

   const date = new Date(props.dateCreated)
   const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' } as const)

   const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
   const handleClose = () => setAnchorEl(null)

   const open = Boolean(anchorEl)
   const id = 'popover'

   return (
      <ListItem alignItems='flex-start' sx={{ marginY: 1 }}>
         <Box
            sx={{
               width: '100%',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'space-between',
               alignItems: 'stretch',
               '@media (min-width: 600px)': { flexDirection: 'row', alignItems: 'center' },
            }}
         >
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  '@media (min-width: 600px)': { justifyContent: 'flex-start', columnGap: 8 },
               }}
            >
               <h3>{props.name}</h3>
               <p>
                  {props.sumOfTasks} {props.sumOfTasks === 1 ? 'task' : 'tasks'}
               </p>
               <p>{formattedDate}</p>
            </Box>
            <CategoryActions
               categoryId={props.categoryId}
               name={props.name}
               popoverId={id}
               anchorEl={anchorEl}
               open={open}
               handleClick={handleClick}
               handleClose={handleClose}
            />
         </Box>
      </ListItem>
   )
}

export default CategoryItem
