import { GetStaticProps } from 'next'
import * as React from 'react'
import Code from '../src/components/Code'
import Footer from '../src/components/Layout/Footer'
import Header from '../src/components/Layout/Header'
import Main from '../src/components/Layout/Main'
import NavBar from '../src/components/NavBar'
import { dataMusics, dataUsers } from './api'
import Content from '../src/components/Layout/Content'
import { Musics } from './api/music'
import { Users } from './api/users'
import usePopup from '../src/_PasStyle/Components/Modal/hooks/useModal'

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
        musics:Array<Musics>
        users:Array<Users>
    }
}

const Home = ({
    datas
} : Props) => {
    const {state} = usePopup()
    const {'state':state2} = usePopup()

    return(
        <>
           <Header>
                <NavBar 
                    current='docs'
                />
           </Header>
            <Main>
                <Content 
                        tag='SECTION'
                        mg='50px'
                        pd='50px' 
                        titleContent={'quick start'} 
                        text={'blá blá'}
                    >
                       
                            <Code>
                                npm i passtyle
                            </Code>
                            <Code>
                                yarn i passtyle
                            </Code>
                    </Content>
            </Main>
            <Footer>

            </Footer>
        </>
    )
}

export default Home