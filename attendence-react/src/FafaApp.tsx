// ...existing code...
export function FafaApp() {
    return (
        <div
            style={{
                direction: 'ltr',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                fontSize: '4rem', // bigger text
                textAlign: 'center',
                gap: '1rem',
                paddingRight: '25vw' // reserve space so main content doesn't sit under the fixed sidebar
            }}
        >
            <div
                style={{
                    position: 'relative',
                    width: '100vw',
                    maxWidth: 'none',
                    marginLeft: 'calc(50% - 50vw)',
                    display: 'block',
                    height: '300px',
                    overflow: 'hidden'
                }}
            >
                <img
                    src="/banner.jpg"
                    alt="Guide banner"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        bottom: '1rem',
                        transform: 'translateX(-50%)',
                        color: '#fff',
                        fontWeight: 900,
                        fontSize: '3.5rem',
                        textShadow: '0 2px 6px rgba(0,0,0,0.6)',
                        pointerEvents: 'none'
                    }}
                >
                    Game Artist
                </div>
            </div>

            {/* main introduction removed from center — moved into sidebar */}

            {/* Fixed side box (snappy: stays when scrolling) */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '25vw',          // 25% of the viewport width
                    height: '100vh',        // full viewport height so it stays visible
                    background: 'rgba(255,255,255,0.98)',
                    boxShadow: '-2px 0 8px rgba(0,0,0,0.12)',
                    padding: '1rem',
                    overflowY: 'auto',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <img
                        src="/avatar.jpg"
                        alt="faegheh avatar"
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            flex: '0 0 auto'
                        }}
                    />
                    <div style={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1 }}>
                        faegheh bagheri
                    </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>Sidebar</div>
                <div style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
                    This box is fixed and will remain visible when you scroll. Put navigation, controls or any
                    persistent UI here.
                </div>
                {/* ...add more sidebar content as needed... */}
            </div>
        </div>
    )
}
// ...existing code...