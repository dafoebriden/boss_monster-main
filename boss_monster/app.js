let gold = 0
let potions = 0
let potionEffect = 10
let reward = 10

const heroes = [
    {
        name: 'Knight',
        type: 'Human',
        damage: 10,
        health: 50
    },
    {
        name: 'Sam',
        type: 'dwarf',
        isEnabled: false,
        damage: 5,
        health: 100
    },
    {
        name: 'Jake',
        type: 'elf',
        isEnabled: false,
        damage: 10,
        health: 50
    }
]

const boss = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1
}

function drawHero() {
    heroes.forEach(hero => {
        const heroElem = document.getElementById(hero.name)
        const statsElem = heroElem.querySelector('.stats')
        statsElem.innerText = `
        ${hero.name}
        Damage: ${hero.damage}
        Health: ${hero.health}
        `
    })
    document.getElementById('gold').innerHTML = gold
    document.getElementById('potion').innerHTML = potions
    document.getElementById('effect').innerHTML = potionEffect
}

function attackBoss() {
    const knight = heroes.find(hero => hero.name == 'Knight')
    boss.health -= knight.damage
    callHealthBar()
    nextLevel()
}

function heroesAttack() {
    const sam = heroes.find(hero => hero.name == 'Sam')
    const jake = heroes.find(hero => hero.name == 'Jake')
    
    if(sam.isEnabled) {
        boss.health -= sam.damage
        callHealthBar()
        nextLevel()
    }
    
    if(jake.isEnabled) {
        boss.health -= jake.damage
        callHealthBar()
        nextLevel()
    }
}

function bossAttack() {
    const sam = heroes.find(hero => hero.name == 'Sam')
    const jake = heroes.find(hero => hero.name == 'Jake')
    const knight = heroes.find(hero => hero.name == 'Knight')
    knight.health -= boss.damage
    drawHero()
    
    if(sam.isEnabled) {
        sam.health -= boss.damage
        drawHero()
    }
    
    if(jake.isEnabled) {
        jake.health -= boss.damage
        drawHero()
    }
    
    if(knight.health <= 0) {
        window.alert("GAME OVER")
        gameOver()
    }
}

function buyCharacter(name, num) {
    const heroName = heroes.find(hero => hero.name == name)
    
    if(heroName.name == 'Sam' && gold >= num) {
        heroName.isEnabled = true
        console.log('You bought Sam!')
        gold -= num
        document.getElementById('Sam').style.display = 'block'
        document.getElementById('upgradeSam').style.display = 'block'
        drawHero()
        heroesAttack()
    } else {
        console.log("Something went wrong...")
    }
    
    if(heroName.name == 'Jake' && gold >= num) {
        heroName.isEnabled = true
        document.getElementById('Jake').style.display = 'block'
        document.getElementById('upgradeJake').style.display = 'block'
        gold -= num
        console.log('You bought Jake!')
        drawHero()
        heroesAttack()
    }
}

//function upgrade(name, cost) {
 //   const heroName = heroes.find(hero => hero.name == name)
  //  
  //  if(heroName.name == 'Sam' && heroName.isEnabled == true && gold >= cost) {
 //       heroName.damage += 10
  //      cost += 5
   //     document.getElementById('upgradeSam').innerHTML = cost
 //   }
//}

function buyPotion() {
    if(gold >= 25) {
        potions++
        gold -= 25
        drawHero()
    }
}

function applyPotion(name) {
    const heroName = heroes.find(hero => hero.name == name)
    if(potions > 0) {
        heroName.health += potionEffect
        potions--
        drawHero()
    }
}

function nextLevel() {
    const knight = heroes.find(hero => hero.name == 'Knight')
    const level = document.getElementById('bossLevel')
    document.getElementById('reward').innerHTML = reward
    
    if(boss.health <= 0) {
        gold += reward
        reward += 10
        boss.level++
        boss.maxHealth += 20
        boss.damage += 2
        boss.health = boss.maxHealth
        potionEffect += 2
        knight.damage += 2
        level.innerText = boss.level
        document.getElementById('reward').innerHTML = reward
        document.getElementById('bossBar').style.width = `100%`
        drawHero()
    } 
}

function callHealthBar(){
    document.getElementById('bossBar').style.width = `${(boss.health/boss.maxHealth)*100}%`
    }
    
    
function reset() {
    gold = 0
    potions = 0
    potionEffect = 10
    reward = 10
    boss.health = 100
    boss.maxHealth = 100
    boss.damage = 5
    boss.level = 1
    document.getElementById('bossLevel').innerHTML = boss.level
    drawHero()
    callHealthBar()
    const sam = heroes.find(hero => hero.name == 'Sam')
    const jake = heroes.find(hero => hero.name == 'Jake')
    const knight = heroes.find(hero => hero.name == 'Knight')
    
    knight.damage = 10
    knight.health = 50
    sam.isEnabled = false
    jake.isEnabled = false 
    document.getElementById('Jake').style.display = 'none'
    document.getElementById('Sam').style.display = 'none'
}

function gameOver() {
    reset()
}

function updateScreen() {
    drawHero()
    setInterval(heroesAttack, 1000)
    setInterval(bossAttack, 5000)
}

updateScreen()