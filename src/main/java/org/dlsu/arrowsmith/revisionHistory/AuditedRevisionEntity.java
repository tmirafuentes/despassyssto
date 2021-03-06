package org.dlsu.arrowsmith.revisionHistory;

import org.dlsu.arrowsmith.classes.main.Term;
import org.dlsu.arrowsmith.classes.main.User;
import org.hibernate.envers.NotAudited;
import org.hibernate.envers.RevisionEntity;
import org.hibernate.envers.RevisionNumber;
import org.hibernate.envers.RevisionTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "revision_history")
@RevisionEntity(EntityRevisionTrackerListener.class)
public class AuditedRevisionEntity {
    @RevisionNumber
    @Id
    @SequenceGenerator(name = "revisionSeq", sequenceName = "REVISION_DATOS_ID_SEQ", allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "revisionSeq")
    private Long id;

    @RevisionTimestamp
    private Date dateModified;

    // Name of User
    private String userID;

    @OneToMany(mappedBy = "revision", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Set<ModifiedEntityTypeEntity> modifiedEntityTypes = new HashSet<ModifiedEntityTypeEntity>();

    /* Constructor */
    public AuditedRevisionEntity() { }

    /* Getters and Setters */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Temporal(value = TemporalType.TIMESTAMP)
    public Date getDateModified() {
        return dateModified;
    }

    public void setDateModified(Date dateModified) {
        this.dateModified = dateModified;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public Set<ModifiedEntityTypeEntity> getModifiedEntityTypes() {
        return modifiedEntityTypes;
    }

    public void setModifiedEntityTypes(Set<ModifiedEntityTypeEntity> modifiedEntityTypes) {
        this.modifiedEntityTypes = modifiedEntityTypes;
    }

    public void addModifiedEntityType(String entityClassName, Serializable serializable)
    {
        String entityID = serializable.toString();
        modifiedEntityTypes.add(new ModifiedEntityTypeEntity(this, entityClassName, Long.parseLong(entityID)));
    }
}
