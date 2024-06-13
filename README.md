Can be installed like so:

```pip install streamlit-multi-menu```

Usage example:

```import streamlit as st
from streamlit_multi_menu import streamlit_multi_menu

### Define Menu
sub_menus = {"Finance":["Stock prediction","Turn around rate"],
             "Cars":["Drift","Garage"],
             "Food":["Ramen","Bubble Tea","Kitchen Design"]}

# Optinally you can supply google icons
sub_menu_icons = {
    "Finance": ["trending_up", "sync_alt"], 
    "Cars": ["directions_car", "garage"], 
    "Food": ["restaurant", "local_cafe", "kitchen"]
}

selected_menu = streamlit_multi_menu(menu_titles=list(sub_menus.keys()),
                              sub_menus=sub_menus,
                            sub_menu_icons = sub_menu_icons,
                            use_container_width=True)

if selected_menu != None:
    st.write("The selected menu is:",selected_menu)
```

All options are:
```
use_container_width = True
menu_titles = list of menu titles
sub_menus = dict of menu titles and list of sub menu titles
sub_menu_imgs = dict of menu titles and list of url-to-img
sub_menu_icons = dict of menu titles and list of google icons
menu_titles_font_size = 26
sub_menu_color = "#some hex value"
sub_menu_font_size = 16
sub_menu_button_gap = 10
sub_menu_font_color =  "#some hex value"
sub_menu_border_radius = 8
sub_menu_text_align = 'center' ```
