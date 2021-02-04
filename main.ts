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
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -5
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.blizzard, 500)
    scene.cameraShake(4, 500)
})
let statusbar: StatusBarSprite = null
let Enemy_Space_Craft: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.blizzard.startScreenEffect(500)
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
controller.moveSprite(mySprite, 100, 100)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
let speed_of_enemy = 15
let Spawn_enemy_time = 3500
game.onUpdateInterval(5000, function () {
    speed_of_enemy += 10
    speed_of_enemy = Math.min(speed_of_enemy, 50)
    Spawn_enemy_time += -500
    speed_of_enemy = Math.max(Spawn_enemy_time, 50)
})
forever(function () {
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
        `, SpriteKind.Enemy)
    Enemy_Space_Craft.x = scene.screenWidth()
    Enemy_Space_Craft.vx = 0 - speed_of_enemy
    Enemy_Space_Craft.y = randint(10, scene.screenHeight())
    statusbar = statusbars.create(13, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(Enemy_Space_Craft)
    pause(Spawn_enemy_time)
})
