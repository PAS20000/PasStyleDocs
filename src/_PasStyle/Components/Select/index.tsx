import * as React from 'react'
import PasStyle from '../..'
import useThemeCTX from '../../Contexts/ThemeContext/useThemeCTX'
import Button from '../Button'
import Icons from '../Icons'

type Props = {
    title:string
    children?:React.ReactNode
    icon?:React.ReactChild
    w?:string
    open?:boolean
    wOptions?:string
    onClick?:React.MouseEventHandler
    transform?:string
}

type ValueState = {
    navLang:string
    formTag:string
    formF_weight:string
    formT_transform:string
}

const Select = ({
    title,
    children,
    icon,
    w,
    onClick,
    transform,
    wOptions,
    open
} : Props) => {

    const arrayChildren = React.Children.toArray(children)
    const items = 3
    const {theme} = useThemeCTX()

    const kid = (index?:number) => {
        return index ? children[index].props.value : children[0].props.value
    }

    const [value, setValue] = React.useState<ValueState>({
        navLang:kid(),
        formTag:kid(),
        formF_weight:kid(),
        formT_transform:kid()
    })

    const [ pagination, setPagination ] = React.useState({
        init:0,
        final:items
    })

    const options = () => {
        return arrayChildren.slice(pagination.init , pagination.final)
    }

    const TratamentSetValue = (innerHtml : any) => {

        setValue({
            navLang:innerHtml,
            formF_weight:innerHtml,
            formTag:innerHtml,
            formT_transform:innerHtml,
        })
    }

    const action = {
        next(e : React.MouseEvent | MouseEvent) {
            const { length } = arrayChildren
            const { init, final } = pagination
    
            if(final < length && e.isTrusted){
                setPagination({
                    init:init + items,
                    final:final + items
                })
            } else {
                setPagination({
                    init:0,
                    final:items
                })
            }
        },
        previous(e : React.MouseEvent | MouseEvent) {
            const { length } = arrayChildren
            const { init, final } = pagination
    
            if(init > (items - 1) && e.isTrusted){
                setPagination({
                    init:init - items,
                    final:final - items
                })
            } else {
                setPagination({
                    init:length - items,
                    final:length
                })
            }
        }
    }

    const Listener = () => {
        const arrayOptions = Array.from(document.querySelectorAll('.option'))
      
        arrayOptions.map(opt => opt.addEventListener('click', () => TratamentSetValue(opt.innerHTML)))
    }

    React.useEffect(() => {
        Listener()
    }, [open])

    return(
        <PasStyle
            w={w} 
            unselectableText
        >
            <PasStyle tag='LABEL'
                onClick={onClick}
                h='11px'
                position='absolute'
                bg={theme.colors.bg}
                mg='2px 28px 0px'
                color={theme.colors.green}
                transform='translateY(-10px)'
                pd='0px 4px 0px'
                b_radius='8px'
                f_size='12px'
                t_transform='capitalize'   
            >
                {title}
            </PasStyle>
            <PasStyle 
                 f_size='12px'
                 t_transform='capitalize'
                 mg='0px 20px 0px'
                 pd='5px'
                 cursor='pointer'
                 t_decoration='none'
                 b_radius='8px'
                 border='solid 2px'
                 color={open ? theme.colors.green : theme.colors.white}
                 _hover={{
                     transition: '1s',
                     color:theme.colors.green,
                     bg:theme.colors.darkGray
                 }}
                onClick={onClick}
            >
                <PasStyle flex between>
                    <PasStyle f_size='0.8rem'
                        color={theme.colors.yellow}
                    >
                       {children[0].props.value}
                    </PasStyle>
                    {icon ??  <Icons.Go.GoKebabVertical  style={{marginTop:'3px', fontSize:'14px'}}/>}
                </PasStyle>
            </PasStyle>
            {open &&
                <PasStyle grid
                    position='absolute'
                    bg={theme.colors.bg}
                    transform={transform}
                    pd='10px'
                    b_radius='8px'
                    border='solid 1px'
                    b_color={theme.colors.green}
                    t_align='center'
                    animation={{
                        name:'show',
                        time:1,
                    }}
                    z='3'
                    w={wOptions}
                >
                    <Button  onClick={(e) => action.next(e)}> 
                        <Icons.Io.IoIosArrowUp />
                    </Button>
                        {options()}
                    <Button  onClick={(e) => action.previous(e)}> 
                        <Icons.Io.IoIosArrowDown />
                    </Button>
                </PasStyle>
            }
        </PasStyle>
    )
}

export default Select