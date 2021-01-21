controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . 4 4 . . . 
        . . . . . . . 4 4 4 4 2 2 . . . 
        . . . 4 4 4 4 4 4 2 2 2 4 . . . 
        . . . . . . . . . . . 4 4 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.blizzard, 500)
    scene.cameraShake(4, 500)
})
let Enemy_Space_Craft: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . 2 2 2 
    . . . . . . . . . . . . 2 2 2 2 
    . . . . . . . . . . 6 6 6 6 . . 
    . . . . . . . . 6 6 6 9 9 6 . . 
    . . . . . . 6 6 6 6 6 6 6 6 . . 
    . . . . 6 6 6 6 8 8 8 6 9 9 . . 
    . . . 6 6 6 6 6 8 8 8 6 9 9 . . 
    . 6 6 6 6 6 6 6 6 6 6 6 9 9 . . 
    6 6 6 6 6 8 8 8 6 6 6 6 9 9 . . 
    6 6 6 6 6 8 8 8 6 6 6 6 9 9 . . 
    . . . 6 6 6 6 6 6 8 8 8 9 9 . . 
    . . . . . . 6 6 6 8 8 8 6 6 . . 
    . . . . . . . . 6 6 6 6 6 6 . . 
    . . . . . . . . . 6 6 6 2 2 2 2 
    . . . . . . . . . . . . . 2 2 2 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
game.onUpdateInterval(3500, function () {
    Enemy_Space_Craft = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . 2 2 5 5 
        . . . . . . . . 2 2 2 2 2 . 5 5 
        . . . . . . . 2 2 2 2 2 2 2 5 5 
        . . . . . . 2 2 2 2 2 2 2 2 5 5 
        . . . . . 2 2 2 3 3 3 2 2 . . . 
        . . . . 2 2 2 2 3 3 3 2 . . . . 
        . . . 2 2 2 2 2 2 2 2 . . . . . 
        2 2 2 2 2 3 3 3 2 2 2 . . . . . 
        2 2 2 2 2 3 3 3 2 2 2 2 . . . . 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        . . . 2 2 2 2 2 2 3 3 3 2 2 5 5 
        . . . . . 2 2 2 2 3 3 3 2 2 5 5 
        . . . . . . . . 2 2 2 2 2 2 5 5 
        . . . . . . . . . . . 2 2 2 5 5 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    Enemy_Space_Craft.x = scene.screenWidth()
    Enemy_Space_Craft.vx = -10
    Enemy_Space_Craft.y = randint(0, scene.screenHeight() - -5)
})
