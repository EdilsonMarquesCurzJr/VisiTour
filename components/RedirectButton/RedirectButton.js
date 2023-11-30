import { Link } from "expo-router";


export const RedirectButton = ({ children, ...props }) => {
    return (
        <Link {...props}>
            {children}
        </Link>
    );
}
