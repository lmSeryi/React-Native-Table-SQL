import React, { useEffect, useState } from 'react';
import { Text, View, Alert  } from 'react-native';
import { styles } from './style'
import { Input } from 'react-native-elements'
import { ShowLetter } from '../../hooks/showLetter'
import { DataTablePagination, DataTableCell, DataTableRow, TextField, Button, Dialog, IconButton , Searchfield, DataTable   } from 'material-bread';
import { Delete } from 'react-native-vector-icons'

export const Header = () =>{

    //get Api data
    const [tasks, setTasks] = useState([])
    
    //send APi data
    const [Task, setTask] = useState('')
    const [Description, setDescription] = useState('')
    const [search, setSearch] = useState('')

    //Dialogs
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [showMessage2, setShowMessage2] = useState(false)
    const [message2, setMessage2] = useState('')

    //Actions
    const [id, setId] = useState(0)

    //Table
    const [page, setPage] = useState(0)
    const [perPage, setPerPage] = useState(3)

    const datos = async ()=>{
        const apiCall = await fetch('http://192.168.0.4:3000/Hi')
        const setTask = await apiCall.json()
        setTasks(setTask)
    }

    useEffect(()=>{
        datos()
    },[])

    const addTask = async () => {
        if(Task.length < 1 || Description.length < 1){
            setShowMessage(true)
            setMessage('Please, type the task and the description')
        }
        else{
            await fetch('http://192.168.0.4:3000/Hi', {
                method: 'POST',
                body: JSON.stringify({
                    title: Task,
                    description: Description
                }),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            setTask('')
            setDescription('')
            datos()
        }
        
    }

    

    const Message = (id) =>{
        setShowMessage2(true)
        setMessage2(`Are you sure? \nThe task will be permanently deleted`)
        setId(id)
    }

    const removeTask = async (id) =>{   
            
                await fetch(`http://192.168.0.4:3000/Hi/${id}`, {
                    method: 'delete',
                    body: JSON.stringify({id}),
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                datos()
           
    }

    const editTask = async (id) =>{
        if(Task.length < 1 || Description.length < 1){
            setShowMessage(true)
            setMessage('Please, type the task and the description')
        }
        else{
            await fetch(`http://192.168.0.4:3000/Hi/${id}`, {
                method: 'put',
                body: JSON.stringify(
                        {
                            title,
                            description
                        }
                    ),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            datos()          
        }
    }

    const searchTask = async (val) =>{
        const apiCall = await fetch(`http://192.168.0.4:3000/Hi/${val}`)
        const setTask = await apiCall.json()
        setTasks(setTask)
    }

    return (
        <View style={{flex: 5}}>
            <View style={{flex: .05, backgroundColor: '#1089ff'}}/>   
            <View style={{marginLeft: 20, marginRight: 20, marginTop: 10, backgroundColor: "#fff"}}>
            <Searchfield 
                color={'#136Ee9'}
                value={search}
                onChangeText={(val) => {
                    setSearch(val)
                    searchTask(val)
                    setPage(0)
                }}
                onCloseIcon = {()=>setSearch('')}
                onKeyUp={()=>{}}
        />
            </View>
            <View style={styles.container}>            
                <DataTable>
                    <DataTableRow>
                        <DataTableCell text={'Task'} type={'header'} borderRight />
                        <DataTableCell  style = {{width: 250, heigth: 200}} text={'Description'}  type={'header'}  right />
                        <DataTableCell/>
                    </DataTableRow>
                    {
                        tasks
                            .slice(
                            page * perPage,
                            page * perPage + perPage,
                            )
                            .map(row => (
                            <DataTableRow key={row._id} style={styles.row}>
                                <DataTableCell text={row.Tasks} borderRight flex={2} />
                                <DataTableCell style = {{width: 250, heigth: 200}}  text={row.Description} right />
                                <DataTableCell>
                                    <IconButton name="edit" 
                                        size={20} 
                                        color={'#55ccff'}
                                        onPress={()=>editTask(row._id)}
                                    />
                                    <IconButton 
                                        name="delete" 
                                        size={20} 
                                        color={'#F44336'} 
                                        onPress={()=>{
                                            Message(row._id)
                                        }}/>
                                </DataTableCell>
                            </DataTableRow>      
                            ))
                    }

                    <DataTablePagination
                        page={page}
                        numberOfPages={
                            tasks.length / perPage
                        }
                        numberOfRows={tasks.length}
                        perPage={perPage}
                        onChangePage={page => {setPage(page)}}
                        onChangeRowsPerPage={perPage => setPerPage(perPage)}
                        possibleNumberPerPage={[2,3]}
                    />
                </DataTable>
            </View>
            
            <View style={{marginLeft: 20, marginRight: 20, backgroundColor: "#fff"}}>
                <TextField
                    label={'Task'}
                    value={Task}
                    onChangeText={value => {setTask(value)}}
                />
                <TextField
                    label={'Description'}
                    value={Description}
                    onChangeText={value => setDescription(value)}
                />
                <Button style={{marginTop:5}} text={'Send'} type="outlined" textColor={'#009688'} onPress={() => addTask()}/>
                <Dialog
                    visible={showMessage}
                    onTouchOutside={() => setShowMessage(false)}
                    supportingText={message}
                    style={{width: 280}}
                    actionItems={[
                    {
                        text: 'OK',
                        onPress: () =>  setShowMessage(false),
                    },
                    ]}
                /> 
                <Dialog
                    visible={showMessage2}
                    onTouchOutside={() => setShowMessage(false)}
                    supportingText={message2}
                    style={{width: 280}}
                    actionItems={[
                    {
                        text: 'Cancel',
                        onPress: () => setShowMessage2(false)
                    },
                    {
                        text: 'Delete',
                        onPress: () =>  {
                            removeTask(id)
                            setShowMessage2(false)
                        }
                    },
                    ]}
                /> 
            </View>                  
        </View>
    );
}


  