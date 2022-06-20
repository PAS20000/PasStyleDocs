import { GetStaticProps } from 'next'
import * as React from 'react'
import Form from './components/Form'
import Footer from '../../src/components/Layout/Footer'
import Header from '../../src/components/Layout/Header'
import Main from '../../src/components/Layout/Main'
import NavBar from '../../src/components/NavBar'
import { dataMusics, dataUsers } from '../api'
import Avatar from './components/Avatar'
import Container from '../../src/components/Layout/Container'
import Config from './components/Config'
import { Musics } from '../api/music'
import { Users } from '../api/users'
import useThemeCTX from '../../src/_PasStyle/Contexts/ThemeContext/useThemeCTX'
import Modal from '../../src/_PasStyle/Components/Modal'
import ModalBody from '../../src/_PasStyle/Components/Modal/ModalBody'
import useModal from '../../src/_PasStyle/Components/Modal/hooks/useModal'

export const getStaticProps : GetStaticProps = async (ctx) => {
    
    try {
        //const resp = await axiosConfig(`users/{params.id}/`)
        const respMusics = dataMusics
        const respUsers = dataUsers

        return {
            props: {
              datas:{
                  Musics:respMusics,
                  users:respUsers,
              },
            },
          }

    } catch (e) {
        console.log(e)
        return {
            props: {
              datas:{
                  Musics:[{}],
                  users:[{}],
              },
            },
            notFound:true
          }
    }
}

type Props = {
    datas:{
        Musics:Array<Musics>
        users:Array<Users>
    }
}

export type ShowState = 'css' | 'hover' | 'props' | 'create'

const Demo = ({
    datas
} : Props) => {

    const { theme } = useThemeCTX()
    const [ show, setShow ] = React.useState<ShowState>('props')
   const {state} = useModal()

    return(
        <>
           <Header>
                <NavBar 
                    current='demo'
                />
           </Header>
            <Main>
               <Container 
                    pd='50px' 
                    mg='50px'
                    bg={theme.colors.bg}
                    b_radius='8px'
                    shadow='2px 2px 10px black'
                >
                   <Config 
                       setState={state[1]}
                       setShow={setShow}
                   />
                    {dataUsers.map(user =>  
                        <Avatar key={user.id}
                            createdAt={user.createdAt}
                            likes={user.likes}
                            avatar={user.avatar}
                            document={user.document}
                            email={user.email}
                            name={user.name}
                            id={user.id}
                            phone={user.phone}
                            status={user.status}
                        />
                    )}
               </Container>
            </Main>
            <Modal state={state}>
                    <ModalBody
                         bg={theme.colors.bg}
                         b_radius='8px'
                         shadow='2px 2px 10px black'
                    >
                        <Form
                            setShow={setShow}
                            show={show}
                        />
                    </ModalBody>
                </Modal>
            <Footer>

            </Footer>
        </>
    )
}

export default Demo