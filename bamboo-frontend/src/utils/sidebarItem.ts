import { IconType } from "react-icons/lib"


export type SideBarItem = {
    icon: IconType,
    label: string,
    isFocused: boolean,
    route: string
}