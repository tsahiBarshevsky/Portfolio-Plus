import React from 'react';
import { Container, Links, LinksLi, Link } from './CreditsElements';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ScrollToTop from '../ScrollToTop';
import Emoji from 'react-emoji-render';

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
	typography:
	{
		allVariants: { fontFamily: `"Andika New Basic", sans-serif` },
        body1: { fontSize: '18.5px' },
        h3: 
        { 
            textShadow: '0px 2px rgba(255, 64, 64, 0.7)', 
            paddingBottom: '50px',
            paddingTop: '100px',
            [defaultTheme.breakpoints.down("xs")]:
            {
                paddingTop: '20px',
            }
        },
	}
});

function Credits() 
{
    const bg1 = "https://www.freepik.com/free-vector/flat-design-blue-comic-style-background_11685286.htm#page=1&query=background&position=11";
    const bg2 = "https://www.freepik.com/free-vector/abstract-design-background-with-blue-purple-gradient_10547226.htm#page=1&query=background&position=26";
    const bg3 = "https://www.freepik.com/free-vector/flat-design-red-comic-style-background_11685287.htm#page=1&query=background&position=38";
    const bg4 = "https://www.freepik.com/free-vector/abstract-colorful-shapes-background_11299315.htm#page=1&query=background&position=42#position=42&page=1&query=background";
    const bg5 = "https://www.freepik.com/free-vector/brush-strokes-background_4122340.htm#page=2&query=background&position=4";
    const bg6 = "https://www.freepik.com/free-vector/color-seamless-space-pattern_10838001.htm#page=2&query=pattern+background&position=17";
    const bg7 = "https://www.freepik.com/free-vector/tropical-green-leaves-background_7557476.htm";
    const link1 = "https://www.freepik.com/free-vector/futuristic-wavy-dots-background_11299382.htm#page=1&query=abstract%20background&position=19";
    const link2 = "https://www.freepik.com/free-vector/404-error-poster-with-page-found-use-website_11244284.htm#page=2&query=404&position=0";
    const link3 = "https://dev.to/hrishikesh1990/i-made-100-high-quality-illustrations-totally-free-use-it-anywhere-without-attribution-452o?";
    const link4 = "https://2.flexiple.com/scale/all-illustrations";
    
    return (
        <Container>
            <ScrollToTop />
            <MuiThemeProvider theme={theme}>
                <Typography variant="h3" align="center" gutterBottom>
                    That's time to say thank you! <Emoji text=":clap:" style={{transform: "translateY(-100%)"}} />
                </Typography>
            </MuiThemeProvider>
            <Links>
                <LinksLi>
                    <MuiThemeProvider theme={theme}>
                        <Typography>
                            Blue comic background had made by freepik in <Link href={bg1} target="_blank">Freepik</Link>
                        </Typography>
                    </MuiThemeProvider>
                </LinksLi>
                <LinksLi>
                    <MuiThemeProvider theme={theme}>
                        <Typography>
                            Blue & purple gradient background had made by kjpargeter in <Link href={bg2} target="_blank">Freepik</Link>
                        </Typography>
                    </MuiThemeProvider>
                </LinksLi>
                <LinksLi>
                    <MuiThemeProvider theme={theme}>
                        <Typography>
                            Red comic background had made by freepik in <Link href={bg3} target="_blank">Freepik</Link>
                        </Typography>
                    </MuiThemeProvider>
                </LinksLi>
                <LinksLi>
                    <MuiThemeProvider theme={theme}>
                        <Typography>
                            Colorful shapes background had made by freepik in <Link href={bg4} target="_blank">Freepik</Link>
                        </Typography>
                    </MuiThemeProvider>
                </LinksLi>
                <LinksLi>
                    <MuiThemeProvider theme={theme}>
                        <Typography>
                            Brush strokes background had made by rawpixel.com in <Link href={bg5} target="_blank">Freepik</Link>
                        </Typography>
                    </MuiThemeProvider>
                </LinksLi>
                <LinksLi>
                    <MuiThemeProvider theme={theme}>
                        <Typography>
                            Seamless space background had made by tartila in <Link href={bg6} target="_blank">Freepik</Link>
                        </Typography>
                    </MuiThemeProvider>
                </LinksLi>
                <LinksLi>
                    <MuiThemeProvider theme={theme}>
                        <Typography>
                            Tropical background had made by pikisuperstar in <Link href={bg7} target="_blank">Freepik</Link>
                        </Typography>
                    </MuiThemeProvider>
                </LinksLi>
                <LinksLi>
                    <MuiThemeProvider theme={theme}>
                        <Typography>
                            Footer and forms background had made by freepik in <Link href={link1} target="_blank">Freepik</Link>
                        </Typography>
                    </MuiThemeProvider>
                </LinksLi>
                <LinksLi>
                    <MuiThemeProvider theme={theme}>
                        <Typography>
                            404 Illustration has made by macrovector <Link href={link2} target="_blank">Freepik</Link>
                        </Typography>
                    </MuiThemeProvider>
                </LinksLi>
                <LinksLi>
                    <MuiThemeProvider theme={theme}>
                        <Typography>
                            Although he doesn't demand any attribution, 
                            I want to <br /> thank <Link href={link3} target="_blank">hrishikesh1990</Link> for the <Link href={link4} target="_blank">illustrations</Link>
                        </Typography>
                    </MuiThemeProvider>
                </LinksLi>
            </Links>
        </Container>
    )
}

export default Credits;
