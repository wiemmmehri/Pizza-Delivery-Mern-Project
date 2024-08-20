import React from 'react';

function Footer() {
    return (
        <footer className="footer" style={{ backgroundColor: 'rgb(68 68 68)', padding: '20px 0', textAlign: 'center', color: '#FFF5E1', position: 'relative', bottom: '0', width: '100%' }}>
            <div className="container">
                <small style={{ display: 'block', marginBottom: '10px' }}>
                    © {new Date().getFullYear()} Wiem Mehri - Oasis Infobytes
                </small>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFF5E1', textDecoration: 'none' }}>
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFF5E1', textDecoration: 'none' }}>
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFF5E1', textDecoration: 'none' }}>
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFF5E1', textDecoration: 'none' }}>
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
