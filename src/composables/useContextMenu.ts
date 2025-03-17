export interface MenuPosition {
  x: number
  y: number
}

export function useContextMenu<MenuType>(initialItems: MenuType[] = []) {
  const show = ref(false)
  const position = ref<MenuPosition>({ x: 0, y: 0 })
  const menuItems = ref<MenuType[]>(initialItems)

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    position.value = {
      x: e.clientX,
      y: e.clientY,
    }

    show.value = true
  }

  const closeMenu = () => {
    show.value = false
  }

  const setMenuItems = (items: MenuType[]) => {
    menuItems.value = items
  }

  const setupClickOutside = () => {
    document.addEventListener('click', closeMenu)
    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }

  return {
    show,
    position,
    menuItems,
    handleContextMenu,
    closeMenu,
    setMenuItems,
    setupClickOutside,
  }
}
