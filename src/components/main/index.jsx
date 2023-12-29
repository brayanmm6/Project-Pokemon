import { StyledMain } from "../../styled-components/main"

const Main = (props) => {
    
    return (
        <StyledMain theme={props.theme}>
            {props.children}
        </StyledMain>
    )
}

export { Main }