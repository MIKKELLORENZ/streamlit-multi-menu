import streamlit.components.v1 as components
import streamlit as st
import os

_RELEASE = True

if _RELEASE:
    root_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(root_dir,"frontend/build")

    streamlit_multi_menu = components.declare_component(
                    "streamlit_multi_menu",
                    path=build_dir
                )
else:
    streamlit_multi_menu  = components.declare_component(
                    "streamlit_multi_menu",
                    url="http://localhost:3001",
                )

# ### Define Menu
# sub_menus = {"Finance":["Stock prediction","Turn around rate"],
#              "Cars":["Drift","Garage"],
#              "Food":["Ramen","Bubble Tea","Kitchen Design"]}


# list_of_finance_imgs = ["https://cdn1.vectorstock.com/i/1000x1000/09/30/stock-market-background-or-forex-trading-business-vector-29570930.jpg",
#                         "https://thumbs.dreamstime.com/b/three-part-cycle-diagram-white-background-53987147.jpg"]

# list_of_car_imgs = ["https://as1.ftcdn.net/v2/jpg/02/74/00/80/1000_F_274008098_hp9JCh3EM3UctN4ihEYarXY3c6wM7A0e.jpg",
#                     "https://img.freepik.com/free-vector/empty-storehouse-warehouse-interior-factory_1441-3877.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1710201600&semt=ais"]

# list_of_food_imgs = ["https://wallpapercave.com/wp/wp2394010.png",
#                      "data:image/jpeg;base64,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",
#                      "https://thumbs.dreamstime.com/b/white-modern-kitchen-20858104.jpg"]

# sub_menu_imgs = {"Finance":list_of_finance_imgs,
#              "Cars":list_of_car_imgs,
#              "Food":list_of_food_imgs}

# sub_menu_icons = {
#     "Finance": ["trending_up", "sync_alt"],  # Example icons for "Stock prediction" and "Turn around rate"
#     "Cars": ["directions_car", "garage"],    # Example icons for "Drift" and "Garage"
#     "Food": ["restaurant", "local_cafe", "kitchen"],  # Example icons for "Ramen", "Bubble Tea", and "Kitchen Design"
# }

# selected_menu = streamlit_multi_menu(menu_titles=list(sub_menus.keys()),
#                               sub_menus=sub_menus,
#                             sub_menu_imgs=sub_menu_imgs,
#                             sub_menu_icons = sub_menu_icons,
#                             sub_menu_border_radius = 8,
#                             sub_menu_text_align = "center",
#                               sub_menu_button_gap = 8,
#                               menu_titles_font_size=24,
#                               use_container_width=True,
#                               sub_menu_font_size=16)


# if selected_menu != None:
#     st.write("The selected menu is")
#     st.header(selected_menu, divider='rainbow')