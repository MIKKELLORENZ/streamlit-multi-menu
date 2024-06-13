import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib";
import React, { ReactNode } from "react";

// No longer using the custom hook since we'll integrate the stylesheet link directly into the render method

function darkenColor(color: string, percent: number): string {
  let num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = ((num >> 8) & 0x00FF) - amt,
      B = (num & 0x0000FF) - amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

class StreamlitMultiMenu extends StreamlitComponentBase {
  public render = (): ReactNode => {
    const menu_titles = this.props.args["menu_titles"];
    const menu_titles_font_size = this.props.args["menu_titles_font_size"]; 
    const sub_menus = this.props.args["sub_menus"];
    const use_container_width = this.props.args["use_container_width"] ?? true;
    const sub_menu_color = this.props.args["sub_menu_color"]; // Custom color provided by the user
    const sub_menu_font_size = this.props.args["sub_menu_font_size"]; 
    const sub_menu_button_gap = this.props.args["sub_menu_button_gap"] || 10; 
    const sub_menu_font_color = this.props.args["sub_menu_font_color"] || "#31333F"; 
    const sub_menu_imgs = this.props.args["sub_menu_imgs"] || {};
    const sub_menu_icons = this.props.args["sub_menu_icons"] || {};
    const sub_menu_text_align = this.props.args["sub_menu_text_align"] || "center";
    const sub_menu_border_radius = this.props.args["sub_menu_border_radius"] || 8;
    // Ensure sub_menu_icons is defined
    const safeSubMenuIcons = sub_menu_icons || {};

    const safeSubMenuColor = sub_menu_color || '#F0F2F6';
    const darkerSubMenuColor = darkenColor(safeSubMenuColor, 10);

    const componentStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      width: '100%',
    };

    const titleContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      flex: use_container_width ? 1 : undefined,
      margin: '0 5px',
    };

    const titleStyle: React.CSSProperties = {
      marginBottom: '5px',
      fontWeight: 'bold',
      fontSize: menu_titles_font_size,
    };

    const lineStyle: React.CSSProperties = {
      height: '1.25px',
      backgroundColor: '#BDBFC3',
      width: '100%',
    };

    // Ensure the Material Icons stylesheet is available
    return (
      <>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <div style={componentStyle}>
          {menu_titles.map((title: string, index: number) => (
            <div key={title} style={titleContainerStyle}>
              <h3 style={titleStyle}>{title}</h3>
              <div style={lineStyle}></div>
              {
  sub_menus[title] && sub_menus[title].map((subMenu: string, subMenuIndex: number) => {
    const iconName = sub_menu_icons[title] && sub_menu_icons[title][subMenuIndex] ? sub_menu_icons[title][subMenuIndex] : '';
    const imgUrl = sub_menu_imgs[title] && sub_menu_imgs[title][subMenuIndex] ? `url(${sub_menu_imgs[title][subMenuIndex]})` : '';

    return (
      <div key={subMenu + subMenuIndex} style={{ marginTop: sub_menu_button_gap, width: '100%' }}>
        <button
          onClick={() => this.onSubMenuClicked(subMenu)}
          onMouseOver={(e) => {
            const button = e.currentTarget;
            button.style.backgroundColor = darkenColor(safeSubMenuColor, 20);
            button.style.filter = 'brightness(80%)';
          }}
          onMouseOut={(e) => {
            const button = e.currentTarget;
            button.style.backgroundColor = safeSubMenuColor;
            button.style.filter = 'none';
          }}
          style={{
            cursor: "pointer",
            width: "100%",
            borderRadius: sub_menu_border_radius,
            backgroundColor: safeSubMenuColor,
            backgroundImage: imgUrl,
            backgroundSize: 'cover', // Cover the entire button area
            backgroundPosition: 'center', // Center the background image
            transition: 'background-color 0.01s, filter 0.01s',
            color: sub_menu_font_color,
            border: "none",
            padding: '5px 5px',
            fontSize: sub_menu_font_size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Adjusted for equal spacing
          }}
          disabled={this.props.disabled}
        >
          {iconName ? (
            <>
              <i className="material-icons" style={{ marginRight: '8px', color: sub_menu_font_color, flexShrink: 0 }}>{iconName}</i>
              <span style={{ textAlign: sub_menu_text_align, flexGrow: 1 }}>{subMenu}</span>
              <span style={{ visibility: 'hidden', flexShrink: 0 }}>Icon</span> {/* Invisible placeholder for balancing */}
            </>
          ) : (
            <span style={{ textAlign: sub_menu_text_align, flexGrow: 1 }}>{subMenu}</span> // Centered text without icon
          )}
        </button>
      </div>
                );
              })}
            </div>
          ))}
        </div>
      </>
    );
  };

  private onSubMenuClicked = (subMenuName: string): void => {
    Streamlit.setComponentValue(subMenuName);
  };
}

export default withStreamlitConnection(StreamlitMultiMenu);