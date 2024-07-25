import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { BsInbox } from "react-icons/bs";
import { MdDrafts } from "react-icons/md";
import { FaChevronLeft, FaExclamationCircle, FaFileAlt, FaQuestionCircle, FaUsers } from 'react-icons/fa';
import { useAppDispatch } from '../../redux/hooks';
import { setShowHelp } from '../../redux/slices/settingsSlice';


const Help = () => {

    const dispatch = useAppDispatch();
    return (
        <Box sx={{ width: '100%', bgcolor: '', color:'white' }}>
            <header className="flex justify-start items-center my-3 gap-5 text-lg text-[var(--text-primary)]">
                <button onClick={() => dispatch(setShowHelp(false))} className='text-[var(--text-secondary)] hover:bg-[var(--accent-color)] rounded-full p-2'>
                    <FaChevronLeft />
                </button>
                <h1>
                    Help
                </h1>
            </header>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color:'white' }}>
                            <FaQuestionCircle />
                        </ListItemIcon >
                        <ListItemText primary="Help Center" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color:'white' }}>
                            <FaUsers />
                        </ListItemIcon>
                        <ListItemText primary="Contact Us" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color:'white' }}>
                            <FaFileAlt />
                        </ListItemIcon>
                        <ListItemText primary="Privacy policy" />
                    </ListItemButton>
                </ListItem>
                
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon sx={{ color:'white' }}>
                            <FaExclamationCircle />
                        </ListItemIcon>
                        <ListItemText primary="Report" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </Box>

        
    )
}

export default Help