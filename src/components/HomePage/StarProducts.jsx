import { useRef } from 'react'
import productImg from '../../assets/Rectangle 2.png'

const StarProducts = () => {
    const scrollRef = useRef(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)

    const data = [
        {
            id: 1,
            img: productImg,
            title: "Agriculture Application",
            tags: ["UI/UX Design", "App Design", "Web Design"],
        },
        {
            id: 2,
            img: productImg,
            title: "Market Guru Logo",
            tags: ["Graphic Design", "Logo Design", "Branding"],
        },
        {
            id: 3,
            img: productImg,
            title: "Kazi Business Card",
            tags: ["Graphic Design", "Business Card", "Branding"],
        },
        {
            id: 4,
            img: productImg,
            title: "Nova Brand Identity",
            tags: ["Branding", "Logo Design", "Print"],
        },
        {
            id: 5,
            img: productImg,
            title: "Lumina Web Design",
            tags: ["UI/UX Design", "Web Design", "Figma"],
        },
    ]

    /* ── Mouse drag ── */
    const onMouseDown = (e) => {
        isDragging.current = true
        startX.current = e.pageX - scrollRef.current.offsetLeft
        scrollLeft.current = scrollRef.current.scrollLeft
        scrollRef.current.style.cursor = 'grabbing'
    }

    const onMouseMove = (e) => {
        if (!isDragging.current) return
        e.preventDefault()
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = (x - startX.current) * 1.2
        scrollRef.current.scrollLeft = scrollLeft.current - walk
    }

    const stopDrag = () => {
        isDragging.current = false
        if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
    }

    /* ── Touch drag ── */
    const onTouchStart = (e) => {
        startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft
        scrollLeft.current = scrollRef.current.scrollLeft
    }

    const onTouchMove = (e) => {
        const x = e.touches[0].pageX - scrollRef.current.offsetLeft
        const walk = (x - startX.current) * 1.2
        scrollRef.current.scrollLeft = scrollLeft.current - walk
    }

    return (
        <section style={styles.section}>

            {/* ── Header ── */}
            <div style={styles.header}>
                <h2 style={styles.heading}>Star Products</h2>
                <div style={styles.btnGroup}>
                    <button
                        style={styles.btnPrimary}
                        onMouseEnter={e => Object.assign(e.currentTarget.style, styles.btnPrimaryHover)}
                        onMouseLeave={e => Object.assign(e.currentTarget.style, { ...styles.btnPrimary, transform: 'scale(1)' })}
                    >
                        Customized now
                    </button>
                    <button
                        style={styles.btnOutline}
                        onMouseEnter={e => Object.assign(e.currentTarget.style, styles.btnOutlineHover)}
                        onMouseLeave={e => Object.assign(e.currentTarget.style, {
                            ...styles.btnOutline, background: 'transparent', color: '#4f46e5', transform: 'scale(1)'
                        })}
                    >
                        Explore services
                    </button>
                </div>
            </div>

            {/* ── Drag-to-scroll strip ── */}
            <div
                ref={scrollRef}
                className="sp-scroll"
                style={styles.scrollWrapper}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
            >
                <div style={styles.grid}>
                    {data.map((item) => (
                        <div key={item.id} className="sp-card" style={styles.card}
                            onMouseEnter={e => {
                                if (isDragging.current) return
                                e.currentTarget.querySelector('.card-img').style.transform = 'scale(1.04)'
                                e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,70,229,0.13)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.querySelector('.card-img').style.transform = 'scale(1)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <div style={styles.imgWrapper}>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="card-img"
                                    style={styles.img}
                                    draggable={false}
                                />
                            </div>
                            <h3 style={styles.cardTitle}>{item.title}</h3>
                            <div style={styles.tagsRow}>
                                {item.tags.map((tag, i) => (
                                    <span key={i} style={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

                /* hide scrollbar, enable grab */
                .sp-scroll {
                    overflow-x: auto;
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    cursor: grab;
                    user-select: none;
                }
                .sp-scroll::-webkit-scrollbar { display: none; }

                /* 2 full cards + half of 3rd always visible */
                .sp-scroll .sp-card {
                    /* 2.5 cards fit in the visible area:
                       width = (100% of wrapper - gap*2) / 2.5          */
                    width: calc((100% - 28px * 2) / 2.5);
                    min-width: 260px;
                    flex-shrink: 0;
                }

                @media (max-width: 640px) {
                    .sp-scroll .sp-card {
                        /* on small screens show 1.2 cards */
                        width: calc((100% - 28px) / 1.2);
                    }
                }
            `}</style>
        </section>
    )
}

const styles = {
    section: {
        // background: '#f0f0f0',
        width: "90%",
        margin: "0 auto",
        padding: '40px 0',
        fontFamily: "'DM Sans', sans-serif",
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '36px',
        flexWrap: 'wrap',
        gap: '16px',
    },
    heading: {

        fontWeight: 800,
        fontSize: '3rem',
        color: '#050C29',
        margin: 0,
        letterSpacing: '-1px',
    },
    btnGroup: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
    },
    btnPrimary: {
        background: '#4f46e5',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        padding: '13px 26px',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: '15px',
        cursor: 'pointer',
        transition: 'transform 0.18s, background 0.18s',
        outline: 'none',
    },
    btnPrimaryHover: {
        background: '#3730a3',
        transform: 'scale(1.04)',
    },
    btnOutline: {
        background: 'transparent',
        color: '#4f46e5',
        border: '1.5px solid #4f46e5',
        borderRadius: '10px',
        padding: '12px 26px',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: '15px',
        cursor: 'pointer',
        transition: 'transform 0.18s, background 0.18s, color 0.18s',
        outline: 'none',
    },
    btnOutlineHover: {
        background: '#4f46e5',
        color: '#fff',
        transform: 'scale(1.04)',
    },
    /* scrollWrapper has no width cap — it fills section padding naturally */
    scrollWrapper: {
        paddingBottom: '4px',
    },
    /* grid uses flex; card widths are controlled via CSS class .sp-card */
    grid: {
        display: 'flex',
        gap: '28px',
    },
    card: {
        /* Base inline styles — actual width overridden by .sp-card in <style> */
        flexShrink: 0,
        borderRadius: '18px',
        transition: 'box-shadow 0.22s',
    },
    imgWrapper: {
        width: '100%',
        aspectRatio: '',
        borderRadius: '18px',
        overflow: 'hidden',
        marginBottom: '18px',
        background: '#e2e2e8',
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: 'none',
    },
    cardTitle: {

        fontWeight: 700,
        fontSize: '1.2rem',
        color: '#0d0d1a',
        margin: '0 0 10px 0',
        letterSpacing: '-0.3px',
    },
    tagsRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
    },
    tag: {
        background: '#ededf5',
        color: '#4b4b6b',
        borderRadius: '999px',
        padding: '5px 14px',
        fontSize: '13px',
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
    },
}

export default StarProducts