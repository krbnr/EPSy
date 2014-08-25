Phaser.Plugin.EPSY=function(game,parent){Phaser.Plugin.call(this,game,parent),this.emitters=[],this.defaultTexture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACz0lEQVR42t2XP0hbURTGnfp/KK3QFiylCG11aRYpBQWFDiJCg266BNQtdnBQyOASQjp1KS4KGVw6iXMWEUdHUShkCBhSQpaQkJg/Jmm/H3xLEdtaWvLawMfJvfec79x77jnnvdfX96/9MpnM9VwudzOfz98qFAq3kYyZ/6tOi8XinVKpdLdSqfRXq9UHwsNarfYIyZh51tH7Y5s5Pj6+BqHI7+OsXq8/aTQag8LzZrM5JAwjGTPPOnroY4f9bzvPZrM3OBEnFPFTOXohvGy1WiPC6/Pz81FhDMmYedbRQx877OG5snPutFwu3zs7OxvQyZ6JPGSnE8KkMN1ut98KYSRjz094MyHssIcHviud3M4fE15OJuJxOZoSZoU5ISIsCIuWEc+zPoW+IzIED3y/FAnujLCxczt/JbI3Pum8sCQsCyudTmdVWEMy9vyS9cLYYe9NDMD705wgcbg7h33Ezmd8wqidrgtxISm8t4x7ns1ErT/jTYzABy/8Pyw1spcE4g4d9rDJ3ok8JiSED8KGsClsWW54nvUY+rYL+zpC8MJ/aYmyO0qILCaRfOfzPnnMJ/0opIRPwk63291FepzyetKbiNp+Cj544b80CtwRdUwpkc1OqCWHPWHybTtNS+5LHlimPb9tvYSvg5yYhQ9e+PFzWfj7aSa++0ln9bLvlvCm7GRP8lDySDhBerzn9ZT1152Yc/A5Fwbxc+EaqFPaKR3N9T7tO1xxgm04zJz0UPis/6fCFyRjbyJtPfTjro4IfPDCj58LfYEHCllKydDZ3GQWHP6kE23H4T6y05Jk1fLUkdh3TmzabtV9gmY1Cj9+8PfdBniqOQGHaa/O/kXXOaW25fAeOOycvPpVP6THJ86JXVcHdmtuVlTDGPz4wV+wItDzHOh5FfS8DwSiE/b8WdDzp2Eg3gd6/kYUiHfCQLwVB+K7IBBfRoH5Nvyvf98A3rZr7fen7G8AAAAASUVORK5CYII=",this._sortFn=function(a,b){return(a.__z||0)-(b.__z||0)};var _this=this;this._onResume=function(){for(var i=0;i<_this.emitters.length;i++)_this.emitters[i].lastTimestamp=Date.now()},game.onResume.add(this._onResume,this),this.game.epsy=this},Phaser.Plugin.EPSY.prototype=Object.create(Phaser.Plugin.prototype),Phaser.Plugin.EPSY.prototype.constructor=Phaser.Plugin.EPSY,Phaser.Plugin.EPSY.VERSION="0.5.1";var updateParticle=function(emitter,particle){particle.sprite||(particle.sprite=PIXI.Sprite.fromImage(particle.texture||this.defaultTexture),particle.sprite.__parentParticle=particle,particle.sprite.anchor.x=.5,particle.sprite.anchor.y=.5,particle.sprite.tail=0,particle.ready=!0),particle.inserted||(particle.inserted=!0,emitter.buffer.push(particle.sprite),emitter.container.addChild(particle.sprite)),particle.sprite.width=particle.radius*particle.scale,particle.sprite.height=particle.radius*particle.scale,particle.sprite.position.x=particle.pos.x,particle.sprite.position.y=particle.pos.y,particle.sprite.blendMode=particle.textureAdditive?PIXI.blendModes.ADD:PIXI.blendModes.NORMAL,particle.sprite.tint=~~particle.color[2]+256*~~particle.color[1]+65536*~~particle.color[0],particle.sprite.alpha=particle.color[3]};Phaser.Plugin.EPSY.Emitter=function(particleSystem,emitter){PIXI.DisplayObjectContainer.call(this),this.particleSystem=particleSystem,this.emitter=emitter},Phaser.Plugin.EPSY.Emitter.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),Phaser.Plugin.EPSY.Emitter.prototype.constructor=Phaser.Plugin.EPSY.Emitter,Phaser.Plugin.EPSY.Emitter.prototype.preUpdate=function(){},Phaser.Plugin.EPSY.Emitter.prototype.postUpdate=function(){},Phaser.Plugin.EPSY.Emitter.prototype.destroy=function(){},Phaser.Plugin.EPSY.Emitter.prototype.update=function(){var timestamp=Date.now(),delta=timestamp-(this.__ez_parent.lastTimestamp||timestamp);this.__ez_parent.lastTimestamp=timestamp,delta/=1e3;var emitter=this.emitter;emitter.update(delta);for(var i=0;i<emitter.particles.length;++i){var p=emitter.particles[i];p.life>0&&p.color&&updateParticle.call(this.particleSystem,emitter,p)}},Phaser.Plugin.EPSY.Emitter.prototype.reset=function(){var buffer=this.emitter.buffer,container=this.emitter.container;do{var sprite=buffer.pop();sprite&&(container.removeChild(sprite),sprite.__parentParticle&&(sprite.__parentParticle.inserted=!1))}while(buffer.length>0)},Phaser.Plugin.EPSY.prototype.createEmitter=function(config,x,y){x=x||0,y=y||0;var emitter=new Ezelia.ParticleSystem.Emitter(config);return emitter.buffer=[],emitter.settings.pos.x=0,emitter.settings.pos.y=0,this.emitters.push(emitter),emitter.container=new Phaser.Plugin.EPSY.Emitter(this,emitter),emitter.container.position.x=x,emitter.container.position.y=y,emitter.zIndex=config.zIndex,emitter.container.__ez_parent=emitter,emitter.lastTimestamp=Date.now(),emitter.container},Phaser.Plugin.EPSY.prototype.loadSystem=function(config,x,y){x=x||0,y=y||0;var parseddata,systemGroup=game.add.group();parseddata="string"==typeof config?JSON.parse(_data):"object"!=typeof config||config instanceof Array?config:[config];for(var i=0;i<parseddata.length;i++){var config=parseddata[i],emitter=this.createEmitter(config,config.pos.x,config.pos.y);systemGroup.add(emitter)}return systemGroup.position.x=x,systemGroup.position.y=y,systemGroup.children.sort(this._sortFn),systemGroup};