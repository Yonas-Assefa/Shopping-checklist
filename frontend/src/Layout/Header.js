import React from "react";


const Header = () => {


    return (
        <header className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono" role="banner">
            <div className="flex items-center">
                <a href="/" className="pl-8">
                    <img src="https://i.imgur.com/7I9Was5.png" alt="logo" className="h-12" />
                </a>
            </div>
        </header>
    );
}

export default Header;
