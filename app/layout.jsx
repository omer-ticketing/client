import "bootstrap/dist/css/bootstrap.css";

export default ({ children }) => {
    return (
        <html lang="en">
            <body>
                <h3>This is a test header</h3>
                {children}
            </body>
        </html>
    );
};
